import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamoDBClient";
import handlebars from "handlebars";
import dayjs from "dayjs";
import { join } from "path";
import { readFileSync } from "fs";
import chromium from "chrome-aws-lambda";
import { S3 } from "aws-sdk";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate extends ICreateCertificate {
  medal: string;
  date: string;
}

const compile = async (data: ITemplate) => {
  const filePath = join(process.cwd(), "src", "templates", "certificate.hbs");
  const html = readFileSync(filePath, "utf-8");

  return handlebars.compile(html)(data);
};

const handler: APIGatewayProxyHandler = async (event) => {
  const { id, name, grade }: ICreateCertificate = JSON.parse(event.body);

  const res = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id =:id",
      ExpressionAttributeValues: { ":id": id },
    })
    .promise();

  await document
    .put({
      TableName: "users_certificate",
      Item: { id, name, grade, created_at: new Date().getTime() },
    })
    .promise();

  const medalPath = join(process.cwd(), "src", "templates", "selo.png");

  const content = await compile({
    id,
    name,
    grade,
    date: dayjs().format("DD/MM/YYYY"),
    medal: readFileSync(medalPath, "base64"),
  });

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();

  page.setContent(content);

  const pdf = await page.pdf({
    format: "a4",
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    path: process.env.IS_OFFLINE ? "./certificate.pdf" : null,
  });

  await browser.close();

  const s3 = new S3({
    endpoint: "http://localhost:8000",
    s3ForcePathStyle: true,
  });

  await s3
    .putObject({
      Bucket: "my-certificate-bucket",
      Key: `${id}.pdf`,
      ACL: "public-read",
      Body: pdf,
      ContentType: "application/pdf",
    })
    .promise();

  console.log("test");

  return { statusCode: 201, body: JSON.stringify({ message: "0" }) };
};

export { handler };

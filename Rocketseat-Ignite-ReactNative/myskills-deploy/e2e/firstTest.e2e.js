describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('check new skill', async () => {
    const input = await element(by.id('input-new-skill'));
    const button = await element(by.id('button'));
    const list = await element(by.id('skills'));

    await input.tap();
    await input.typeText('React Native');
    await button.tap();

    await list.tap();

    expect(element(list)).toBeVisible();
  });
});

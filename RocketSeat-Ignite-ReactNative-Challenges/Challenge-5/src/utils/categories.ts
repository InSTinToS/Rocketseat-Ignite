interface Category {
  name: string;
  label: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    name: "purchases",
    label: "Compras",
    icon: "shopping-bag",
    color: "#5636D3",
  },
  { name: "food", label: "Alimentação", icon: "coffee", color: "#FF872C" },
  { name: "salary", label: "Salário", icon: "dollar-sign", color: "#12A454" },
  { name: "car", label: "Carro", icon: "crosshair", color: "#E83F5B" },
  { name: "leisure", label: "Lazer", icon: "heart", color: "#26195C" },
  { name: "studies", label: "Estudos", icon: "book", color: "#9C001A" },
];

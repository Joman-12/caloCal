import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  caloriesPer100g: number;
  quantity: number | null;
}
interface SelectedProduct {
  id: string;
  name: string;
  caloriesPer100g: number;
  quantity: number | null;
  qteCalorie: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Product[] = [
    { id: '1', name: 'Pomme', caloriesPer100g: 52, quantity: null },
    { id: '2', name: 'Banane', caloriesPer100g: 89, quantity: null },
    { id: '3', name: 'Orange', caloriesPer100g: 47, quantity: null },
    { id: '4', name: 'Poire', caloriesPer100g: 57, quantity: null },
    { id: '5', name: 'Raisin', caloriesPer100g: 69, quantity: null },
    { id: '6', name: 'Fraise', caloriesPer100g: 32, quantity: null },
    { id: '7', name: 'Myrtille', caloriesPer100g: 57, quantity: null },
    { id: '8', name: 'Kiwi', caloriesPer100g: 61, quantity: null },
    { id: '9', name: 'Ananas', caloriesPer100g: 50, quantity: null },
    { id: '10', name: 'Mangue', caloriesPer100g: 60, quantity: null },
    { id: '11', name: 'Avocat', caloriesPer100g: 160, quantity: null },
    { id: '12', name: 'Tomate', caloriesPer100g: 18, quantity: null },
    { id: '13', name: 'Concombre', caloriesPer100g: 16, quantity: null },
    { id: '14', name: 'Carotte', caloriesPer100g: 41, quantity: null },
    { id: '15', name: 'Brocoli', caloriesPer100g: 34, quantity: null },
    { id: '16', name: 'Épinard', caloriesPer100g: 23, quantity: null },
    { id: '17', name: 'Pomme de terre', caloriesPer100g: 77, quantity: null },
    { id: '18', name: 'Patate douce', caloriesPer100g: 86, quantity: null },
    { id: '19', name: 'Oignon', caloriesPer100g: 40, quantity: null },
    { id: '20', name: 'Ail', caloriesPer100g: 149, quantity: null },
    { id: '21', name: 'Poivron', caloriesPer100g: 20, quantity: null },
    { id: '22', name: 'Courgette', caloriesPer100g: 17, quantity: null },
    { id: '23', name: 'Aubergine', caloriesPer100g: 25, quantity: null },
    { id: '24', name: 'Chou-fleur', caloriesPer100g: 25, quantity: null },
    { id: '25', name: 'Laitue', caloriesPer100g: 15, quantity: null },
    { id: '26', name: 'Céleri', caloriesPer100g: 16, quantity: null },
    { id: '27', name: 'Asperge', caloriesPer100g: 20, quantity: null },
    { id: '28', name: 'Petit pois', caloriesPer100g: 81, quantity: null },
    { id: '29', name: 'Maïs', caloriesPer100g: 86, quantity: null },
    { id: '30', name: 'Haricot vert', caloriesPer100g: 31, quantity: null },
    { id: '31', name: 'Lentille', caloriesPer100g: 116, quantity: null },
    { id: '32', name: 'Pois chiche', caloriesPer100g: 164, quantity: null },
    { id: '33', name: 'Riz', caloriesPer100g: 130, quantity: null },
    { id: '34', name: 'Pâtes', caloriesPer100g: 131, quantity: null },
    { id: '35', name: 'Quinoa', caloriesPer100g: 120, quantity: null },
    { id: '36', name: 'Avoine', caloriesPer100g: 389, quantity: null },
    { id: '37', name: 'Pain complet', caloriesPer100g: 247, quantity: null },
    { id: '38', name: 'Œuf', caloriesPer100g: 155, quantity: null },
    { id: '39', name: 'Poulet', caloriesPer100g: 165, quantity: null },
    { id: '40', name: 'Dinde', caloriesPer100g: 135, quantity: null },
    { id: '41', name: 'Bœuf', caloriesPer100g: 250, quantity: null },
    { id: '42', name: 'Porc', caloriesPer100g: 242, quantity: null },
    { id: '43', name: 'Saumon', caloriesPer100g: 208, quantity: null },
    { id: '44', name: 'Thon', caloriesPer100g: 132, quantity: null },
    { id: '45', name: 'Crevette', caloriesPer100g: 99, quantity: null },
    { id: '46', name: 'Lait', caloriesPer100g: 42, quantity: null },
    { id: '47', name: 'Yaourt nature', caloriesPer100g: 59, quantity: null },
    { id: '48', name: 'Fromage', caloriesPer100g: 402, quantity: null },
    { id: '49', name: 'Beurre', caloriesPer100g: 717, quantity: null },
    { id: '50', name: 'Huile d\'olive', caloriesPer100g: 884, quantity: null }
  ]

  searchQuery: string = '';
  selectedProducts: SelectedProduct[] = [];
  totalCalories: number = 0;

  get filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    );
  }

  addProduct(product: Product): void {
    if (product.quantity && product.quantity > 0) {
      
      if(this.selectedProducts.some(prd => prd.id == product.id)) return;

      const qteCalorie = product.quantity * product.caloriesPer100g/100
      this.selectedProducts.push({ ...product, qteCalorie });
      console.log('cal', qteCalorie);
      
      this.calculateTotalCalories();
      this.searchQuery = ''; // Réinitialiser le champ de recherche
    }
  }

  calculateTotalCalories(): void {
    this.totalCalories = this.selectedProducts.reduce((total, product) => {
      return total + (product.caloriesPer100g * (product.quantity || 0) / 100);
    }, 0);
  }

  clearPlats(){
    this.selectedProducts = []
    this.calculateTotalCalories()
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.calculateTotalCalories();
  }
}
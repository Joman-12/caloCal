import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private updates: SwUpdate) {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          console.log('Nouvelle version détectée ! Vidage du cache...');
          this.clearCaches().then(() => {
            window.location.reload(); // Recharge l'application
          });
        }
      });
    }
  }

  /**
   * Fonction pour vider le cache du navigateur.
   */
  private async clearCaches(): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys(); // Récupère tous les caches
      await Promise.all(
        cacheNames.map((cache) => caches.delete(cache)) // Supprime chaque cache
      );
      console.log('Caches supprimés avec succès.');
    } else {
      console.warn('Cache API non disponible.');
    }
  }
}

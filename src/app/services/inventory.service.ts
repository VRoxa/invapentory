import { inject, Injectable } from '@angular/core';
import { BlobService } from './blob.service';
import { Inventory } from '../models/item.model';

const KEY = 'invapentory';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly blobService = inject(BlobService);

  getInventory() {
    return this.blobService.getData<Inventory>(KEY);
  }

  saveInventory(inventory: Inventory) {
    return this.blobService.saveData(KEY, inventory);
  }
}

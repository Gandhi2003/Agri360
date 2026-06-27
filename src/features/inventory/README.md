# Inventory

Feature module for **Inventory** in Agri360 CRM.

## Structure

```
inventory/
├── api/          # Pure HTTP data-access (inventoryApi)
├── components/   # Feature-scoped UI (InventoryForm, ...)
├── hooks/        # TanStack Query hooks (useInventory, useCreateInventory, ...)
├── pages/        # Route-level pages (InventoryListPage)
├── services/     # Business logic / orchestration (inventoryService)
├── schemas/      # Zod validation (inventorySchema)
├── store/        # Zustand UI state (useInventoryStore)
├── types/        # Domain types, DTOs & enums (Inventory, InventoryStatus)
├── constants/    # Query keys & RBAC permissions
├── utils/        # Pure helpers
├── routes.ts     # Lazy-loaded route config (inventoryRoutes)
├── index.ts      # Public barrel
└── README.md
```

## Permissions

| Action | Permission         |
| ------ | ------------------ |
| View   | `inventory:view`   |
| Create | `inventory:create` |
| Update | `inventory:update` |
| Delete | `inventory:delete` |
| Export | `inventory:export` |

## Usage

```ts
import { useInventory, InventoryForm, INVENTORY_PERMISSIONS } from '@features/inventory';
```

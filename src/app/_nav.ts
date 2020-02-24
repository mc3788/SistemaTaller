import { INavData } from '../../dist/@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'cil-chart-line',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Seguridad',
    url: '/seguridad',
    icon: 'cil-lock-locked',
    children: [
      {
        name: 'Usuarios',
        url: '/usuario',
        icon: 'cil-user',
      },
      {
        name: 'Categorias',
        url: '/categoria',
        icon: 'cil-storage',
      },
      {
        name: 'Accesos',
        url: '/acceso',
        icon: 'cil-lock-unlocked',
      }
    ]
  },
  {
    name: 'Distribución',
    url: '/distribucion',
    icon: 'cil-airplane-mode ',
    children: [
      {
        name: 'Proveedores',
        url: '/proveedor',
        icon: 'cil-truck',
      },
      {
        name: 'Marca',
        url: '/marca',
        icon: 'cil-building',
      }
    ]
  },
  {
    name: 'Documentos',
    url: '/documentos',
    icon: 'cil-task',
    children: [
      {
        name: 'Tipos Documento',
        url: '/tipodocumento',
        icon: 'cil-clipboard',
      }
    ]
  },
  {
    name: 'Caja',
    url: '/caja',
    icon: 'cil-wallet',
    children: [
      {
        name: 'Cierre de Caja',
        url: '/cierrecaja',
        icon: 'cil-clipboard',
      },
      {
        name: 'Abonos',
        url: '/creditoscaja',
        icon: 'cil-plus',
      },
      {
        name: 'Gastos',
        url: '/debitoscaja',
        icon: 'cil-minus',
      }
    ]
  },

  {
    name: 'Inventarios',
    url: '/inventarios',
    icon: 'cil-inbox',
    children: [

      {
        name: 'Productos',
        url: '/producto',
        icon: 'cil-tablet',
      },
      {
        name: 'Bodegas',
        url: '/bodega',
        icon: 'cil-factory',
      },
      // {
      //   name: 'Existencias',
      //   url: '/inventario',
      //   icon: 'cil-house',
      // }
    ]
  },
  {
    name: 'Clientes',
    url: '/cliente',
    icon: 'cil-contact',
  }
];

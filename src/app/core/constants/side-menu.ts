interface ISideMenu {
    label: string;
    icon: string;
    path: string;
}

export const SIDE_MENU: ISideMenu[] = [
    {
        label: 'Inicio',
        icon: 'dashboard',
        path: '.'
    },
    {
        label: 'Usuarios',
        icon: 'account_circle',
        path: 'users'
    },
    {
        label: 'Chat',
        icon: 'message',
        path: 'chats'
    },
    {
        label: 'Categorías',
        icon: 'category',
        path: 'categories'
    },
    {
        label: 'Transacciones',
        icon: 'finance_mode',
        path: 'transactions'
    },
    {
        label: 'Bancos',
        icon: 'account_balance',
        path: 'banks'
    },
    {
        label: 'Cuentas Bancarias',
        icon: 'account_balance_wallet',
        path: 'bank-accounts'
    },
    {
        label: 'Legal',
        icon: 'contract_edit',
        path: 'legal'
    },
    {
        label: 'Paquetes',
        icon: 'view_object_track',
        path: 'plans'
    },
    
]
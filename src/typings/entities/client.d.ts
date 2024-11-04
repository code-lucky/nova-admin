namespace Entity {
    interface Client {
        id: number;
        name: string;
        email?: string;
        avatar?: string;
        phone?: string;
        address?: string;
        status: 'enable' | 'disable'; // Assuming 'status' is an enum with possible values
        company?: string;
        notes?: string;
        openid?: string;
        created_at: Date;
        updated_at: Date;
        palette_collects: PaletteCollect[]; // Assuming PaletteCollect is another interface
    }

    interface ClientList {
        total: number
        list: Client[]
    }
}
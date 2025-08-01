import { h } from 'vue';
import { NButton, NTag } from 'naive-ui';

// Type definition for column configuration
export interface ColumnConfig {
    title: string;
    key: string;
    width?: number;
    render?: (row: any) => any;
}

// Function to create deck collection table columns with reference-safe handlers
export const createDeckCollectionColumns = (
    showDetailsHandler: (deck: any) => void,
    deleteHandler: (id: number) => void
): ColumnConfig[] => {
    return [
        {
            title: 'ID',
            key: 'id',
            width: 80
        },
        {
            title: 'Nom du deck',
            key: 'name',
            width: 200,
            render: (row: any) => {
                return h('div', { class: 'deck-name' }, row.name);
            }
        },
        {
            title: 'Nombre de Pokémon',
            key: 'pokemonCount',
            width: 150,
            render: (row: any) => {
                const count = row.pokemonIds ? row.pokemonIds.length : 0;
                return h(NTag, {
                    type: count > 0 ? 'success' : 'warning',
                    size: 'small',
                    round: true
                }, { default: () => `${count} Pokémon` });
            }
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (row: any) => {
                return h('div', { class: 'action-buttons' }, [
                    h(NButton, {
                        type: 'info',
                        size: 'small',
                        round: true,
                        onClick: () => showDetailsHandler(row)
                    }, { default: () => 'Détails' }),
                    h(NButton, {
                        type: 'error',
                        size: 'small',
                        round: true,
                        onClick: () => deleteHandler(row.id)
                    }, { default: () => 'Supprimer' })
                ]);
            }
        }
    ];
};
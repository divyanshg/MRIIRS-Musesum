export default {
    name: 'items',
    type: 'document',
    title: 'Items',
    fields: [
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description'
        },
        {
            name: 'history',
            type: 'text',
            title: 'History'
        },
        {
            name: "colorclass",
            type: "string",
            title: "Color Class",
        },
        {
            name: "youtube",
            type: "string",
            title: "Youtube Link",
        },
        {
            name: 'images',
            type: 'array',
            title: 'Images',
            of: [
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        }
                    ],
                    options: {
                        hotspot: true
                    }
                }
            ]
        }
    ]
}
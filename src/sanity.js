import { createClient } from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
    projectId: "v36fzv8b", // find this at manage.sanity.io or in your sanity.json
    dataset: "production", // this is from those question during 'sanity init'
    useCdn: true,
    apiVersion: "2022-02-03",
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getItem() {
    const item = await client.fetch('*[_type == "items"]')
    return item
}

import { useEffect, useState } from "react"
import { anilistQuery, variables } from "../constants";

export const useFetch = (search: string): [AnilistAnime[] | null, Status, string] => {
    const [data, setData] = useState<AnilistAnime[] | null>(null);
    const [status, setStatus] = useState<Status>();
    const [error, setError] = useState('')

    useEffect(() => {
        if (!search) {
            setData(null)
            return
        }
        
        const timeout = setTimeout(() => {
        setStatus("loading")
        const res = fetch("https://graphql.anilist.co", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: anilistQuery,
                variables: variables(search)
            })
        })

        res.then((data) => {
            if (data.status !== 200)
                throw new Error(`${data.status}: ${data.statusText}`);

            data.json().then((data: AnilistSearchResults | AnilistError) => {
                if ((data as AnilistError).errors)
                    throw new Error(`${(data as AnilistError).errors[0].message}`);

                setData((data as AnilistSearchResults).data.Page.media);
                setStatus("fulfilled")
            }).catch((err: Error) => {
                setError(err.message)
                setStatus("errored")
            })
        })
      }, 800)

        return () => {
            clearTimeout(timeout);
        };
    }, [search])

    return [data, status, error];
}
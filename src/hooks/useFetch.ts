import { useEffect, useState } from "react"
import { variables } from "../constants";

type BasicError = {
    errors: { message: string }[];
}

export const useFetch = <T extends AnilistSearchResults | KitsuSearchResults>(search: string, url: string, query: string): [ T['data'] | null, Status, string] => {
    const [data, setData] = useState<T['data'] | null>(null);
    const [status, setStatus] = useState<Status>();
    const [error, setError] = useState('')

    useEffect(() => {
        if (!search) {
            setData(null)
            return
        }
        
        const timeout = setTimeout(() => {
        setStatus("loading")
        const res = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: variables(search)
            })
        })

        res.then((data) => {
            if (data.status !== 200)
                throw new Error(`${data.status}: ${data.statusText}`);

            data.json().then((data: T | BasicError) => {
                if ((data as BasicError).errors) {
                    throw new Error(`${(data as BasicError).errors[0].message}`);
                }

                setData((data as T).data);

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
import { useState, useEffect } from 'react';
import { initialState } from './utils';

export default function useFetch(url) {
    const [data, setData] = useState(initialState);
    useEffect(() => {
        async function fetchData() {
            setData({ data: null, isError: false, isLoading: true });
            // console.log('is loading');
            try {
                const res = await fetch(url);
                // console.log('got response');
                const data = await res.json();
                // console.log('got data');
                setData({ data: data, isLoading: false, isError: false });
                // console.log('set data');
            } catch (error) {
                console.log(error);
                setData({ data: null, isError: true, isLoading: false });
            }
        }
        fetchData();
    }, [url]);
    return data;
}

// export default function useFetch(url) {
//     const [data, setData] = useState(initialState);
//     useEffect(() => {
//         setData({ data: null, isLoading: true, isError: false });
//         try {
//             fetch(url)
//                 .then(res => res.json())
//                 .then(data => {
//                     setData({
//                         data: data,
//                         isLoading: false,
//                         isError: false
//                     });
//                 });
//         } catch (error) {
//             console.log(error);
//             setData({ data: null, isLoading: false, isError: true });
//         }
//     }, [url]);

//     return data;
//}

import useDebounce from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import React from 'react'
import { Input } from '../ui/input';

interface SearchBarProps {
    url: string;
    placeholder: string;
    setSearchResults: React.Dispatch<React.SetStateAction<any>>;
}

const SearchBar = ({ url, placeholder, setSearchResults }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data, isError, loading, error, refetch } = useFetch(`${url}${debouncedSearchTerm}`, placeholder);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    React.useEffect(() => {
        setSearchResults((prevState: any) => {
            return { ...prevState, loading: loading };
        });
    }, [loading]);

    React.useEffect(() => {
        refetch();
    }, [debouncedSearchTerm, refetch, url]);

    React.useEffect(() => {
        if (data) {
            setSearchResults({ searchResults: data, loading: loading, error: isError ? error : null });
        }
    }, [data, setSearchResults]);

    return (
        <Input
            placeholder={placeholder}
            type='search'
            value={searchTerm}
            onChange={handleChange}
            className='h-12 text-md md:w-[30rem]'
        />
    );
}

export default SearchBar;
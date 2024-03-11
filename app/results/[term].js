import Gallery from "@/components/Gallery";

export default function SearchResults({ params: { term } }) {
    return <Gallery searchTerm={term} />;
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            params,
        },
    };
}

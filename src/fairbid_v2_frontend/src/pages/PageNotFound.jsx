// components
import Title from '@components/Title';
import NotFoundContent from '@layout/404';

const PageNotFound = () => {
    return (
        <>
            <Title title="Page not found" />
            <main>
                <NotFoundContent />
            </main>
        </>
    )
}

export default PageNotFound
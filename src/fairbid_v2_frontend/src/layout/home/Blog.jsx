// components
import SectionHeader from '@components/SectionHeader';
import PostsGrid from '@components/PostsGrid';

const Blog = () => {
    return (
        <section>
            <div className="container">
                <SectionHeader title="Our blog" link={{href: 'blog-sidebar', text: 'See more'}}/>
                <PostsGrid variant="preview"/>
            </div>
        </section>
    );
}

export default Blog
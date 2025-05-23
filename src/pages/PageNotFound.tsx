import SEO from '../components/SEO';
import { useSEO } from '../hooks/useSEO';

function PageNotFound() {
  const seoData = useSEO('pageNotFound');

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <section className='h-screen flex justify-center items-center'>
        <span className='font-labgrotesquebold text-[50px] text-[#554F45] text-center'>
          404
          <br />
          Page not found :(
        </span>
      </section>
    </>
  );
}

export default PageNotFound;

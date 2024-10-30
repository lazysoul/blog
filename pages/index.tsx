import Container from "../components/container";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

function HomePage() {
  return (
    <Container>
      <Head>
        <title>I value the beauty of taking things slowly in development.</title>
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            안녕하세요, 게으른 영혼입니다
          </h1>
          <p className="text-xl text-gray-600">
            <Link href="https://whatap.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
              WhaTap
            </Link>
            에서 모바일 개발을 담당하는 개발자입니다
          </p>
        </div>

        <div className="mb-12">
          <Image
            src="/main.png"
            alt="Let's just have fun"
            width={1920}
            height={1280}
            layout="responsive"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6 text-lg text-gray-700">
          <p>
            &lsquo;게으른 영혼&rsquo;이라는 아이디처럼, 저는 느림의 가치를 소중히 여기며 개발에 임합니다. 
            새로운 기술과 방법을 배우는 것을 즐기며, 다양한 시도를 통해 얻은 경험과 통찰을 
            다른 개발자들과 나누고자 합니다.
          </p>
          <p>
            천천히, 하지만 꾸준히 성장하는 개발자의 여정을 함께 나누겠습니다.
          </p>
          <p className="italic text-gray-600">
            Hi, I&apos;m a mobile developer at <Link href="https://whatap.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">WhaTap</Link>. 
            Like my username &lsquo;lazysoul&rsquo;, I value the beauty of taking things slowly in development. 
            I enjoy learning new technologies and methodologies, and I&apos;d like to share the insights and 
            experiences gained through various experiments with other developers. 
            Let me share my journey as a developer who grows steadily, albeit slowly.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;

import Head from 'next/head';

import { PostData, loadBlogPosts, loadMarkdownFile } from '../loader';
import { PostCard } from '../components/PostCard';
import { generateRSS } from '../rssUtil';
import { Markdown } from '../components/Markdown';
import { config } from '../globals';

const sectionStyle = {
  width: '100%',
  padding: '100px 3vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as const;

const Home = (props: {
  introduction: string;
  posts: PostData[];
}) => {
  return (
    <div style={{ width: '100%' }}>
      <Head>
        <title>Introducing Devii</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ maxWidth: '550px', margin: 'auto', padding: '50px 3vw' }}>
        <Markdown source={props.introduction} />
      </div>
      <div style={sectionStyle}>
        <h2 style={{ margin: '4px 0px', fontSize: '34pt' }}>My blog posts</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(300px,1fr))`,
            gridRowGap: '8px',
            gridColumnGap: '8px',
            width: '100%',
            padding: '0px 7vw',
          }}
        >
          {props.posts.map((post, j) => {
            return <PostCard post={post} key={j} />;
          })}
        </div>
      </div>

      <div style={{ ...sectionStyle }}>
        <h2 style={{ textAlign: 'center', fontSize: '34pt' }}>Quote of the day</h2>
        <blockquote
          style={{
            borderLeft: `3px solid ${config.accentColor}`,
            paddingLeft: '20px',
          }}
        >
          <p style={{ fontSize: '20pt' }}>
            <em>Live lock-free of die dead-locked!</em>
          </p>

          <p style={{ textAlign: 'right' }}>
            — Erik Rigtorp, taken{' '}
            <a href="https://github.com/rigtorp" target="_blank">
              utterly out of context
            </a>
          </p>
        </blockquote>
      </div>
    </div>
  );
};
export default Home;

export const getStaticProps = async () => {
  const introduction = await loadMarkdownFile('introduction.md');

  const posts = await loadBlogPosts();

  // comment out to turn off RSS generation
  // during build step.
  await generateRSS(posts);

  const props = { introduction, posts };
  return { props };
};

import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

export default function Bio() {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;

  return (
    <div>
      <Image fixed={data.avatar.childImageSharp.fixed} alt={author.name} />
      <p>
        Written by <strong>{author.name}</strong> {author.summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>You should follow him on Twitter</a>
      </p>
    </div>
  );
}

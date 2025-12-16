import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

/**
 * Serialize MDX content for rendering
 */
export async function serializeMDX(
  content: string
): Promise<MDXRemoteSerializeResult> {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  });

  return mdxSource;
}

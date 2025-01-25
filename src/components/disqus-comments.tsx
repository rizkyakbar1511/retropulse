"use client";
import { DiscussionEmbed } from "disqus-react";

interface DisqusCommentsProps {
  url: string | undefined;
  identifier: string | undefined;
  title: string | undefined;
}

export default function DisqusComments({ url, identifier, title }: DisqusCommentsProps) {
  return (
    <DiscussionEmbed
      shortname="retropulse"
      config={{
        url,
        identifier,
        title,
        language: "EN", //e.g. for Traditional Chinese (Taiwan)
      }}
    />
  );
}

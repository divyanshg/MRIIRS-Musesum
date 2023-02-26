import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client as sanityClient } from "../sanity";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function Images({ content }) {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center overflow-y max-h-[500px] pt-32">
      {content?.map((image) => (
        <img src={urlFor(image).url()} className="h-[100px] w-[200px]" />
      ))}
    </div>
  );
}

export default Images;

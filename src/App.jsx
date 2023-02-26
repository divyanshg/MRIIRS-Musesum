import { useEffect, useState } from "react";
import { useParams } from "react-router";

import About from "./subScreens/About";
import History from "./subScreens/History";
import Images from "./subScreens/Images";

import imageUrlBuilder from "@sanity/image-url";
import { client as sanityClient } from "./sanity";

const menus = [
  {
    id: 0,
    name: "About",
    isSelected: true,
  },
  {
    id: 1,
    name: "History",
    isSelected: false,
  },
  {
    id: 2,
    name: "Images",
    isSelected: false,
  },
];

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function App({ slug }) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [object, setObject] = useState(null);
  const params = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          slug,
          name,
          description,
          history,
          images,
          colorclass
        }
    `,
        {
          slug: params.slug,
        }
      )
      .then((data) => {
        setObject(data[0]);
      })
      .catch(console.error);
  }, [params.slug]);

  return (
    <div className="h-screen flex flex-col">
      <div
        className={`h-1/5 ${object?.colorclass} relative flex justify-center`}
      >
        <img
          src="https://manavrachna.edu.in/wp-content/uploads/2022/09/newmrlogo-scaled.jpg"
          className="w-40 h-16 my-4 rounded-xl"
        />
        {object && (
          <img
            src={urlFor(object?.images[0]).url()}
            className="h-[140px] absolute -bottom-20 left-[25%]"
          />
        )}
      </div>
      <div className="flex flex-col mt-24 px-6 space-y-4">
        <h1 className="text-xl font-semibold">{object?.name}</h1>
        <div className="flex flex-row space-x-4">
          {menus.map((item) => (
            <button
              key={item.id}
              className="border border-gray-200 rounded-full px-3 py-1 focus:bg-gray-100"
              onClick={() => setCurrentScreen(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="">
          {currentScreen == 0 ? (
            <About content={object?.description} />
          ) : currentScreen == 1 ? (
            <History content={object?.history} />
          ) : currentScreen == 2 ? (
            <Images content={object?.images} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";

const ideas = [
  {
    id: 1,
    title: "Education",
    description: "This is the first perspective",
    likes: 5,
    comments: ["Great idea!", "I agree!"],
  },
  {
    id: 2,
    title: "Family",
    description: "This is the second perspective",
    likes: 3,
    comments: ["Interesting!", "I disagree!"],
  },
  {
    id: 1,
    title: "Religion",
    description: "This is the first perspective",
    likes: 5,
    comments: ["Great idea!", "I agree!"],
  },
  {
    id: 2,
    title: "Sports",
    description: "This is the second perspective",
    likes: 3,
    comments: ["Interesting!", "I disagree!"],
  },

];
const Home = () => {
  return (
    <div className="home sides">
      <div className="home z-10">
        <h1 className="text-4xl font-bold">Welcome to the Perspective App!</h1>
        <p className="lead-loose">
          Share your thoughts, opinions, and experiences, and connect with
          others.
        </p>
        <p className="lead-loose">
          Explore perspectives from different users. Share your thoughts,
          images, and videos!
        </p>
      </div>
      <div className="py-10">
        <h2 className="text-semibold text-xl">TOPICS</h2>
        <hr className="h-1.5"/>
        <div className="py-4 flex items-center justify-between">
            {
                ideas.map(idea => (
                    <div key={idea.id} className="flex items-center py-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                        <div>
                            <h3 className="text-sm font-semibold">{idea.title}</h3>
                            <p className="text-gray-600">{idea.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};
export default Home;

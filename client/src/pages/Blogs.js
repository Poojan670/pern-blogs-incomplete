import React from "react";
import Wrapper from "../layout/Wrapper";
import Author from "../components/sub-components/Author";
import Related from "../components/sub-components/Related";

const Blogs = () => {
  return (
    <Wrapper>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author />
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iste
            obcaecati, doloribus, natus similique explicabo enim repudiandae
            minus placeat.
          </h1>
          <p className="text-gray-500 text-xl text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            inventore dignissimos atque laborum, quisquam quia accusamus saepe.
          </p>

          <div className="py-10">
            <a href="/#">
              {" "}
              <img src="images/gintoki.png" alt="" width={900} height={600} />
            </a>
          </div>
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              perspiciatis doloremque molestiae consequuntur! Placeat quidem,
              commodi iste nobis error nulla laborum nemo minima recusandae
              velit saepe quam id unde voluptates.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque,
              mollitia amet? Fugit placeat sed ad enim laboriosam in aut rem
              accusantium velit blanditiis, accusamus voluptatibus corporis
              quaerat tenetur mollitia provident?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
              dolores ab recusandae quos rerum voluptas praesentium maxime
              accusantium perspiciatis? Inventore numquam dicta similique
              suscipit quae officiis ipsum, accusamus ducimus nulla?
            </p>
          </div>
        </div>
        <Related />
      </section>
    </Wrapper>
  );
};

export default Blogs;

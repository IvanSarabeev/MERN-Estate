import Layout from "components/Layouts/Layout";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";

const CreateListing = () => {
  return (
    <Layout>
      <section className="py-4 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create Listing
        </h1>
        <form
          action=""
          method="post"
          className="gap-4 xl:gap-12 grid grid-cols-1 lg:grid-cols-2 justify-center"
        >
          <div className="flex flex-1 flex-col gap-6">
            <Input
              id="name"
              type="text"
              required
              placeholder="Enter name"
              className="border p-3 rounded-lg"
              minLength={4}
              maxLength={60}
            />
            <textarea
              name="description"
              id="description"
              className="border p-3 rounded-lg"
              placeholder="Enter your description"
            ></textarea>
            <Input
              type="text"
              id="address"
              name="address"
              required
              className="border p-3 rounded-lg"
              placeholder="Specify the property location"
              minLength={6}
              maxLength={30}
            />
            <div className="flex flex-wrap items-center justify-evenly">
              <div className="flex gap-2">
                <Input
                  id="sale"
                  name="sale"
                  className="size-5"
                  type="checkbox"
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="rent"
                  name="rent"
                  className="size-5"
                  type="checkbox"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="parking"
                  name="parking"
                  className="size-5"
                  type="checkbox"
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id="furnished"
                  name="furnished"
                  className="size-5"
                  type="checkbox"
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2 items-center">
                <Input
                  id="bedroom"
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <label htmlFor="bedroom">Bed</label>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  id="bathroom"
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <label htmlFor="bedroom">Baths</label>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  id="regularPrice"
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="bedroom">Regular price</label>
                  <span className="regular-12 text-normal">$ per months</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  id="discountPrice"
                  type="number"
                  min={1}
                  max={10}
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="bedroom">Discount %</label>
                  <span className="regular-12">discounted price</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-8">
            <p className="font-semibold regular-16">
              Images:
              <span className="regular-14 font-normal text-gray-700 ml-2">
                First image cover, total 6(max)
              </span>
            </p>
            <div className="gap-4 flex">
              <Input
                id="images"
                type="file"
                accept="images/*"
                multiple
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <Button
                title="Upload Images"
                className="p-3 text-green-700 rounded-lg border border-green-400 uppercase bg-transparent hover:shadow-lg disabled:opacity-80"
              >
                Upload Files
              </Button>
            </div>
            <Button
              type="submit"
              title="Create Listing"
              className="p-3 capitalize text-white rounded-lg bg-slate-700 transition-all ease-in-out hover:opacity-95 disabled:opacity-80 hover:scale-105"
            >
              Create listing
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default CreateListing;

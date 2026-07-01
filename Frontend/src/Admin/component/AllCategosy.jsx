import { Trash2, SquarePen } from "lucide-react";

const AllCategory = ({
  categories,
  setSelectedCategory,
  deleteCategory,
}) => {
  return (
    <div className="w-full lg:w-3/5">
      <div className="w-full p-4">
        <h3 className="font-semibold text-xl mb-4 text-slate-700">
          All Categories
        </h3>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-3 px-6 py-4 border-b font-semibold text-slate-700 bg-slate-50">
            <p>Image</p>
            <p>Category</p>
            <p>Action</p>
          </div>

          {/* Categories */}
          <div className="max-h-[480px] overflow-y-auto">
            {categories.map((category) => (
              <div
                key={category._id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center px-6 py-4 border-b border-slate-200"
              >
                {/* Image */}
                <div className="flex justify-center md:justify-start">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                </div>

                {/* Name */}
                <div>
                  <p className="font-medium text-slate-700 text-center md:text-left">
                    {category.name}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-center md:justify-start gap-2">
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition"
                  >
                    <SquarePen size={18} />
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this category?"
                        )
                      ) {
                        deleteCategory(category._id);
                      }
                    }}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                No categories found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
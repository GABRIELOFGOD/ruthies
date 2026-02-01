import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useCategory } from "@/hooks/use-category";

interface AddCategoryProps {
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  newCategoryDescription: string;
  setNewCategoryDescription: (description: string) => void;
  handleAddCategory?: () => void;
  newCategoryImage?: File | null;
  setNewCategoryImage?: (file: File | null) => void;
}

const AddCategory = ({
  newCategoryName,
  setNewCategoryName,
  newCategoryDescription,
  setNewCategoryDescription,
  handleAddCategory,
  newCategoryImage,
  setNewCategoryImage,
}: AddCategoryProps) => {
  const { createCategory } = useCategory();

  const internalAdd = async () => {
    try {
      await createCategory({
        name: newCategoryName,
        description: newCategoryDescription,
        imageFile: newCategoryImage || undefined,
      });
      setNewCategoryName("");
      setNewCategoryDescription("");
      setNewCategoryImage?.(null);
    } catch (err) {
      // swallow for now; calling code can provide custom handler to handle errors
      console.error(err);
    }
  };
  return (
    <AlertDialogContent className="bg-white">
      <AlertDialogHeader>
        <AlertDialogTitle>Add category</AlertDialogTitle>
        <AlertDialogDescription>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Category Name</p>
              <Input
                placeholder="Enter category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-10 placeholder:text-gray-400 placeholder:italic"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Category Image</p>
              <div className="w-full flex flex-col gap-2">
                {newCategoryImage ? (
                  <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden group">
                    <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center cursor-pointer transition">
                      <Image
                        src={URL.createObjectURL(newCategoryImage)}
                        alt="Category"
                        fill
                        className="w-full h-full object-cover"
                      />
                      <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100">
                        Change Image
                      </span>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setNewCategoryImage?.(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                ) : (
                  <div
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setNewCategoryImage?.(e.dataTransfer.files[0]);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                  >
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-600">
                      Drag and drop your image here
                    </p>
                    <p className="text-xs text-gray-400">or</p>
                    <label className="text-sm font-semibold text-blue-600 cursor-pointer hover:text-blue-700">
                      browse files
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setNewCategoryImage?.(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold">Category Description</p>
              <Textarea
                placeholder="Describe your category in details"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                className="w-full text-sm font-medium shadow-none border-0 bg-gray-100 h-40 placeholder:text-gray-400 placeholder:italic"
              />
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleAddCategory ?? internalAdd}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
export default AddCategory;

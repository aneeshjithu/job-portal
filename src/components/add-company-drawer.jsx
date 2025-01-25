import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { addNewCompany } from "@/api/apiCompanies";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(1, { message: "Company Name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        (file[0] && file[0].type === "image/png") ||
        file[0].type === "image/jpeg",
      {
        message: "Only images are allowed",
      }
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnAddNewCompany,
    data: dataCompanies,
    loading: addNewCompanyLoading,
    error: addNewCompanyError,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    await fnAddNewCompany({
      ...data,
      logo: data.logo[0],
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (dataCompanies?.length > 0) {
      fetchCompanies();
    }
  }, [addNewCompanyLoading]);
  return (
    <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <Button type="button" variant="secondary" size="sm">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a New Company?</DrawerTitle>
          </DrawerHeader>

          <form
            //onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 p-4 pb-0"
          >
            <div className="flex flex-col lg:flex-row w-full gap-2">
              <Input
                placeholder="Company Name"
                className="flex-1"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <Input
                type="file"
                accept=".png,.jpeg"
                className="flex-1 file:text-gray-500"
                {...register("logo")}
              />
              {errors.logo && (
                <p className="text-red-500">{errors?.logo?.message}</p>
              )}
            </div>
          </form>
          {addNewCompanyError?.message && (
            <p className="text-red-500">{addNewCompanyError?.message}</p>
          )}
          {addNewCompanyLoading && (
            <BarLoader
              className="mb-4"
              height={0.8}
              width={"100%"}
              color="#ff2c2c"
            />
          )}

          <DrawerFooter>
            <DrawerClose asChild>
              <div className="flex flex-col gap-2 lg:flex-row lg:pr-96 lg:pl-96">
                <Button variant="outline" className="w-full" size="sm">
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full"
                  size="sm"
                >
                  Save
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddCompanyDrawer;

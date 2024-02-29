import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FileUpload = ({ onFileUpload }) => {
  // PDFs
  const MAX_FILE_SIZE = 10485760; // 10 MB
  const ALLOWED_FILE_TYPES = ["application/pdf"];

  // Form Hook
  const form = useForm({
    resolver: async (data) => {
      const errors = {};
      if (!data.files || data.files.length === 0) {
        errors.files = 'Required';
      } else if (data.files.length > 5) {
        errors.files = 'Maximum of 5 files are allowed.';
      } else {
        const filesArray = Array.from(data.files);
        if (filesArray.some(file => file.size > MAX_FILE_SIZE)) {
          errors.files = 'Each file size should be less than 10 MB.';
        } else if (!filesArray.every(file => ALLOWED_FILE_TYPES.includes(file.type))) {
          errors.files = 'Only PDF files are allowed';
        }
      }
      return { values: data, errors: errors };
    },
  });

  // Form Submit Handler
  const onSubmit = async (values) => {
    console.log(values);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      onFileUpload(file); // Call the function passed from the parent with the file
    }
  };

  return (
    <section className="flex flex-col gap-5 xl:gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 xl:gap-5">
          <FormField
            control={form.control}
            name="files"
            render={({ field: { onChange }, ...field }) => {
              return (
                <FormItem>
                  <FormLabel>PDF Files</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      multiple={true}
                      disabled={form.formState.isSubmitting}
                      {...field}
                      onChange={(event) => {
                        handleFileChange(event); // Call the handleFileChange function
                        onChange(event.target.files); // Update the form
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Submit and Cancel buttons... */}
        </form>
      </Form>
    </section>
  );
};

export default FileUpload;

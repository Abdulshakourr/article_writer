"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"


const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
})

export default function Create() {
  const [loading, setLoading] = useState(false)
const router = useRouter()

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        title:""
    }
})


const onSubmit = async(Values: z.infer<typeof formSchema>) =>{
    console.log("data",Values)
   try {
    setLoading(true)
    const response = await fetch("api/create",{
      method:"POST",
      body:JSON.stringify(Values)
    })
    if(!response.ok){
      console.log("error",response)
    }
    const data = await response.json()
    console.log("response",data)
    toast({
      variant:"success",
      title:data.message,
      description:"You can now edit your article"
    })
    router.push(`/dashboard/${data.article.id}`)
  
   } catch (error) {
    console.log("[Error]", error)
   } finally{
    setLoading(false)
   }
}

  return (
    <div className="max-w-sm mt-6">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-500">Title</FormLabel>
              <FormControl>
                <Input placeholder="your article title" {...field} />
              </FormControl>
              <FormDescription className="text-xs text-gray-400">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="font-semibold" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
    </div>
  )
}

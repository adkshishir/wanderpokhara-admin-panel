'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import api from '@/repo/api';
import request from '@/repo/request';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function Delete(props: { id: number; type: string }) {
  const router = useRouter();
  let endPoint = () => {
    if (props.type === 'category') {
      return api.CATEGORY + '/' + props.id;
    }
    if (props.type === 'post') {
      return api.POST + '/' + props.id;
    }
    return api.TAG + '/' + props.id;
  };

  async function handleClick() {
    await request.delete({
      endPoint: endPoint(),
      data: {},
      success: (message: string, response: any) => {
        console.log(endPoint(), response);
        toast.success(message + ' ' + props.type);
        router.refresh();
      },
      failure: (error: any) => {
        console.log(error);
        toast.error(error.message + ' ' + props.type);
      },
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will delete your Category
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function loremIpsum() {
  return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quidem vel incidunt alias? Quae eum natus sapiente tempora ea accusantium, unde nulla illum veritatis recusandae fugiat, doloremque ipsa alias facere maiores rem! Tempore, repellat quo doloremque adipisci ab excepturi! Obcaecati, corrupti qui. Velit consequuntur, magnam ut, ratione corporis recusandae aliquid unde quos illum laboriosam quidem, amet adipisci! Corporis, velit aperiam!";
}

export function getThumbOrFallback(thumb: string) {
  if (thumb.includes('blob')) {
      return 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  } else {
      return thumb
  }
}
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Moon, Sun, Tags } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white text-gray-800">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center space-x-4">
//           <span className="text-2xl font-bold">Astro Theme OpenBlog</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Tags className="w-5 h-5 cursor-pointer" />
//           <div className="border-l h-5"></div>
//           <Sun className="w-5 h-5 cursor-pointer" />
//         </div>
//       </header>

//       {/* Categories */}
//       <nav className="px-4 py-2 border-b flex space-x-4 text-sm">
//         <a href="#" className="font-semibold underline">View All</a>
//         <a href="#">Category 1</a>
//         <a href="#">Category 2</a>
//         <a href="#">Category 3</a>
//         <a href="#">Category 4</a>
//       </nav>

//       {/* Main Content */}
//       <main className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Featured Post */}
//         <div className="lg:col-span-2">
//           <Card className="overflow-hidden">
//             <img
//               src="https://via.placeholder.com/600x300"
//               alt="Featured"
//               className="w-full h-60 object-cover"
//             />
//             <CardContent className="p-4">
//               <div className="text-xs text-gray-500 flex justify-between">
//                 <span>Jul 2, 2022</span>
//                 <span>Category 2</span>
//               </div>
//               <h2 className="text-xl font-bold mt-2">Astro Components</h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non dia.
//               </p>
//               <Button variant="link" className="mt-2 px-0">Read Post →</Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar Latest Posts */}
//         <div className="space-y-4">
//           <h3 className="font-bold">Latest Posts</h3>
//           <Card className="overflow-hidden">
//             <img
//               src="https://via.placeholder.com/300x150"
//               alt="Latest"
//               className="w-full h-32 object-cover"
//             />
//             <CardContent className="p-3">
//               <div className="text-xs text-gray-500 flex justify-between">
//                 <span>Jul 2, 2022</span>
//                 <span>Category 3</span>
//               </div>
//               <h4 className="font-semibold text-sm mt-1">Components</h4>
//               <p className="text-xs text-gray-600 mt-1">
//                 Astro components are HTML templates with superpowers.
//               </p>
//               <Button variant="link" className="px-0 text-xs mt-1">Read Post →</Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* More Posts */}
//         <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {[1, 2, 3].map((item) => (
//             <Card key={item} className="overflow-hidden">
//               <img
//                 src="https://via.placeholder.com/300x150"
//                 alt={`Post ${item}`}
//                 className="w-full h-32 object-cover"
//               />
//               <CardContent className="p-3">
//                 <div className="text-xs text-gray-500 flex justify-between">
//                   <span>Jul 2, 2022</span>
//                   <span>Category {item}</span>
//                 </div>
//                 <h4 className="font-semibold text-sm mt-1">
//                   {item === 1 ? "TypeScript2" : item === 2 ? "Tutorial: Create an Astro Component" : "MacBook"}
//                 </h4>
//                 <p className="text-xs text-gray-600 mt-1">
//                   {item === 1
//                     ? "TypeScript2 description here 2"
//                     : item === 2
//                     ? "Learn how to create your first Astro"
//                     : "The new MacBook Pro 2022 is here."}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }


import React from 'react'
import Card from '../components/Card'

function Home() {
  return (
    <Card />
  )
}

export default Home
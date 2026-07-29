// // src/components/Navbar.jsx

// import { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/logo.png";

// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Services", path: "/services" },
//   { name: "Maintenance Plans", path: "/maintenance-plans" },
//   { name: "Service Areas", path: "/service-areas" },
//   { name: "Contact", path: "/contact" },
//   { name: "FAQ", path: "/faq" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const linkClass = ({ isActive }) =>
//     `
//     relative text-sm font-medium transition-all duration-200
//     ${
//       isActive
//         ? "text-white"
//         : "text-slate-200 hover:text-white"
//     }
//     `;

//   return (
//     <nav className="
//       sticky top-0 z-50
//       bg-primary-700/95
//       backdrop-blur-md
//       shadow-lg
//     ">

//       <div className="
//         max-w-7xl
//         mx-auto
//         px-6
//       ">

//         <div className="
//           flex
//           items-center
//           justify-between
//           h-20
//         ">


//           {/* Logo */}
//           <Link 
//             to="/"
//             className="
//             flex
//             items-center
//             gap-3
//             group
//             "
//           >
//             <img
//               src={logo}
//               alt="ArcticAir HVAC Solutions"
//               className="
//               h-12
//               w-auto
//               transition-transform
//               duration-300
//               group-hover:scale-105
//               "
//             />

//             <div className="hidden sm:block">
//               <p className="
//                 text-white
//                 font-display
//                 font-semibold
//                 text-base
//               ">
//                 ArcticAir
//               </p>

//               <p className="
//                 text-xs
//                 text-primary-50
//               ">
//                 HVAC Solutions
//               </p>
//             </div>
//           </Link>


//           {/* Desktop Navigation */}
//           <div className="
//             hidden
//             lg:flex
//             items-center
//             gap-7
//           ">

//             {navLinks.map((link)=>(
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 className={linkClass}
//               >

//                 {({isActive})=>(
//                   <>
//                     {link.name}

//                     {isActive && (
//                       <span className="
//                         absolute
//                         -bottom-2
//                         left-0
//                         w-full
//                         h-0.5
//                         bg-accent-500
//                         rounded-full
//                       "/>
//                     )}

//                   </>
//                 )}

//               </NavLink>
//             ))}

//           </div>



//           {/* CTA Area */}
//           <div className="
//             hidden
//             lg:flex
//             items-center
//             gap-5
//           ">

//             <Link
//               to="/login"
//               className="
//               text-sm
//               font-medium
//               text-white
//               border border-white/30
//               hover:border-white/60
//               hover:bg-white/10
//               rounded-lg
//               px-4 py-2
//               transition-colors
//               "
//             >
//               Log in
//             </Link>


//             <Link
//               to="/request-quote"
//               className="
//               bg-accent-500
//               hover:bg-accent-600
//               text-white
//               font-semibold
//               text-sm
//               px-5
//               py-2.5
//               rounded-xl
//               shadow-md
//               hover:shadow-lg
//               transition-all
//               "
//             >
//               Request Quote
//             </Link>

//           </div>



//           {/* Mobile */}
//           <button
//             onClick={()=>setOpen(!open)}
//             className="
//             lg:hidden
//             text-white
//             p-2
//             rounded-lg
//             hover:bg-primary-600
//             "
//           >

//             {open ? "✕" : "☰"}

//           </button>


//         </div>


//       </div>



//       {/* Mobile Menu */}
//       {open && (

//         <div className="
//           lg:hidden
//           bg-primary-700
//           border-t
//           border-primary-600
//           px-6
//           py-5
//           space-y-4
//         ">

//           {navLinks.map(link=>(

//             <NavLink
//               key={link.path}
//               to={link.path}
//               onClick={()=>setOpen(false)}
//               className="
//               block
//               text-slate-200
//               hover:text-white
//               text-sm
//               "
//             >
//               {link.name}
//             </NavLink>

//           ))}


//           <Link
//             to="/request-quote"
//             className="
//             block
//             text-center
//             bg-accent-500
//             text-white
//             rounded-xl
//             py-3
//             font-medium
//             "
//           >
//             Request Quote
//           </Link>


//         </div>

//       )}

//     </nav>
//   );
// }

// src/components/Navbar.jsx

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Maintenance Plans", path: "/maintenance-plans" },
  { name: "Service Areas", path: "/service-areas" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `
    relative text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "text-white"
        : "text-slate-200 hover:text-white"
    }
    `;

  return (
    <nav className="
      sticky top-0 z-50
      bg-primary-700/95
      backdrop-blur-md
      shadow-lg
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
      ">

        <div className="
          flex
          items-center
          justify-between
          h-20
        ">


          {/* Logo */}
          <Link 
            to="/"
            className="
            flex
            items-center
            gap-3
            group
            "
          >
            <img
              src={logo}
              alt="ArcticAir HVAC Solutions"
              className="
              h-12
              w-auto
              transition-transform
              duration-300
              group-hover:scale-105
              "
            />

            <div className="hidden sm:block">
              <p className="
                text-white
                font-display
                font-semibold
                text-base
              ">
                ArcticAir
              </p>

              <p className="
                text-xs
                text-primary-50
              ">
                HVAC Solutions
              </p>
            </div>
          </Link>


          {/* Desktop Navigation */}
          <div className="
            hidden
            lg:flex
            items-center
            gap-7
          ">

            {navLinks.map((link)=>(
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
              >

                {({isActive})=>(
                  <>
                    {link.name}

                    {isActive && (
                      <span className="
                        absolute
                        -bottom-2
                        left-0
                        w-full
                        h-0.5
                        bg-accent-500
                        rounded-full
                      "/>
                    )}

                  </>
                )}

              </NavLink>
            ))}

          </div>



          {/* CTA Area */}
          <div className="
            hidden
            lg:flex
            items-center
            gap-5
          ">

            <ThemeToggle variant="light" />

            <Link
              to="/login"
              className="
              text-sm
              font-medium
              text-white
              border border-white/30
              hover:border-white/60
              hover:bg-white/10
              rounded-lg
              px-4 py-2
              transition-colors
              "
            >
              Log in
            </Link>


            <Link
              to="/request-quote"
              className="
              bg-accent-500
              hover:bg-accent-600
              text-white
              font-semibold
              text-sm
              px-5
              py-2.5
              rounded-xl
              shadow-md
              hover:shadow-lg
              transition-all
              "
            >
              Request Quote
            </Link>

          </div>



          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle variant="light" />
            <button
              onClick={()=>setOpen(!open)}
              className="
              text-white
              p-2
              rounded-lg
              hover:bg-primary-600
              "
            >

              {open ? "✕" : "☰"}

            </button>
          </div>


        </div>


      </div>



      {/* Mobile Menu */}
      {open && (

        <div className="
          lg:hidden
          bg-primary-700
          border-t
          border-primary-600
          px-6
          py-5
          space-y-4
        ">

          {navLinks.map(link=>(

            <NavLink
              key={link.path}
              to={link.path}
              onClick={()=>setOpen(false)}
              className="
              block
              text-slate-200
              hover:text-white
              text-sm
              "
            >
              {link.name}
            </NavLink>

          ))}


          <Link
            to="/request-quote"
            className="
            block
            text-center
            bg-accent-500
            text-white
            rounded-xl
            py-3
            font-medium
            "
          >
            Request Quote
          </Link>


        </div>

      )}

    </nav>
  );
}
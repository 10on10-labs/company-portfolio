import React from 'react';

const menuItems = [
  {
    title: 'Home',
  },
  {
    title: 'About',
  },
  {
    title: 'Services',
  },
  {
    title: 'Projects',
  },
  {
    title: 'Reviews',
  },
  {
    title: 'Contact Us to get in touch',
  },
];

export const MainSidebar = () => {
  return (
    <div className="bg-primary h-screen w-90 sticky top-0 flex overflow-y-auto hide-scrollbar">
      <div className="p-20 w-full">
        <ul className="text-secondary uppercase font-extrabold text-4xl">
          {menuItems.map(({ title }, key) => (
            <React.Fragment key={key}>
              <li className="mb-6 cursor-pointer">
                <p className="break-words">{title}</p>
                <svg
                  viewBox="0 0 500 30"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full mt-2"
                >
                  <line
                    x1="10"
                    y1="15"
                    x2="490"
                    y2="15"
                    style={{
                      fill: 'none',
                      stroke: '#F5F5EE',
                      strokeWidth: 4,
                      strokeDasharray: '10, 15',
                      strokeLinecap: 'round',
                      animation: 'drawLine 15s linear infinite',
                    }}
                  />
                </svg>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

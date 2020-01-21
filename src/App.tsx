import React, { useState } from 'react';
import pagi from "./assets/sunrise.svg";
import sore from "./assets/sunsite.svg";
import home from "./assets/arabic.svg";
import homes from "./assets/home.svg";
import dpagi from "./data/dpagi.json";
import dsore from "./data/dsore.json";
import { CompoundInterface } from './CompoundInterface';

const Tabs: React.FC = (props: CompoundInterface) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const children = React.Children.map(props.children, (child: any) => {
    if (child.type === TabPanels) {
      return React.cloneElement(child, {
        activeIndex
      })
    } else if (child.type === TabList) { 
      return React.cloneElement(child, {
        activeIndex,
        onActiveTab: (index: number) => {
          setActiveIndex(index)
        }
      })
    } else {
      return child
    }
  })
  return (
    <div className="container">
      {children}
    </div>
  )
}

const TabList: React.FC = ({ children, activeIndex, onActiveTab }: CompoundInterface) => {
  const clone_children = React.Children.map(children, (child: any, index: number) => {
    return React.cloneElement(child, {
      isActive: index === activeIndex,
      onActivate: () => onActiveTab(index)
    })
  })

  return (
    <div className="nav">
    <ul>{clone_children}</ul>
  </div>
 
  )
}

const Tab: React.FC = ({ children, onActivate }: CompoundInterface) => {
  return (
    <li onClick={() => onActivate()}>
      {children}
    </li>
  )
}

const TabPanels: React.FC = ({ children, activeIndex }: CompoundInterface) => {
  return (
    <div className="row">
      <div className="col-md-12">{children[activeIndex]}</div>
    </div>
  )
}

const TabPanel: React.FC = ({ children }: CompoundInterface) => {
  return (
    <div>{children}</div>
  )
}

const App: React.FC = () => {
  return (
      <Tabs>
        <TabList>
          <Tab>
            <img src={homes} alt="" width="35" />
            <p>Home</p>
          </Tab>
          <Tab>  
            <img src={pagi} alt="" width="40" />
            <p>Pagi</p>
          </Tab>
          <Tab>
            <img src={sore} alt="" width="40" />
            <p>Sore</p>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <div className="home-page row text-center justify-content-center">
            <img src={home} alt="" width="20%" />
            <div className="col-md-12 dzikir-text">Dzikir App</div>
          </div>
          </TabPanel>
          <TabPanel>
          <p className="ml-4 my-3 font-weight-bold title">
            <img src={pagi} alt="" width="40" className="mr-2 mb-2" />
            Dzikir Pagi
          </p>
          {dpagi.map((d, index) => (
            <div key={index + 1}>
              <div className="card-doa">
                <p className="text-number">{d.deskripsi}</p>
                <h5 className="text-arab">{d.arab}</h5>
                <p>{d.artinya}</p>
              </div>
            </div>
          ))}
          </TabPanel>
          <TabPanel>
          <p className="ml-4 my-3 font-weight-bold title">
            <img src={sore} alt="" width="40" className="mr-2 mb-2" />
            Dzikir Sore
          </p>
          {dsore.map((d, index) => (
            <div key={index + 1}>
              <div className="card-doa">
                <p className="text-number">{d.deskripsi}</p>
                <h5 className="text-arab">{d.arab}</h5>
                <p>{d.artinya}</p>
              </div>
            </div>
          ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
  );
}

export default App;

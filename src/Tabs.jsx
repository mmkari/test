// @flow
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { ThemedButton as Button } from './Button';

const Tab = styled(Button)`
  flex-grow: 1;
  // &.active {
  //   background: green;
  // }
  // :hover {
  //   background: lightgreen;
  // }
  height: 50px;
`;

const TabsContainer = styled.div`
  display: flex;
`;

const TabContent = styled.div`
  background: pink;

  &.active {
    background: orange;
  }
  display: flex;
  width: 100%;
`;

const TabsContent = styled.div`
  display: flex;
  width: 100%;

  .SwipeableContainer {
    width: 100%;
    overflow: hidden;
  }
`;

type TabsProps = {|
  keys: Array<string>,
  tabs: Array<string>,
  onChange?: Function,
  contents: Function | Array<React.Node>,
  children?: Function,
|};
const Tabs = ({
  keys,
  tabs,
  onChange,
  contents,
  children,
  getRef,
}: TabsProps) => {
  //
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const onTabClick = (index) => {
    setActiveTabIndex(index);
    if (onChange) {
      onChange(index, tabs[index]);
    }
  };

  const defaultRenderer = () => {
    if (typeof contents === 'function') {
      return contents({ activeTab: tabs[activeTabIndex] });
    }
    if (Array.isArray(contents)) {
      return contents.map((item, ind) => {
        return (
          <TabContent
            className="TabContent TC2"
            active={ind === activeTabIndex}
          >
            {item}
          </TabContent>
        );
      });
    }
    return null;
  };

  const contentRenderer = children || defaultRenderer;

  const changeTab = (newIndex) => {
    if (
      typeof newIndex === 'number' &&
      newIndex >= 0 &&
      newIndex < tabs.length
    ) {
      setActiveTabIndex(newIndex);
    }
  };
  // contents can be a function or an array. In case of array, render all but hide non-active tab content
  return (
    <div ref={getRef}>
      <TabsContainer className="TabsContainer">
        {tabs.map((tab, index) => {
          return (
            <Tab
              onClick={() => onTabClick(index)}
              className={classnames('Tab', {
                active: index === activeTabIndex,
              })}
            >
              {tab}
            </Tab>
          );
        })}
      </TabsContainer>

      <TabsContent className="TabsContent">
        {contentRenderer({
          key: keys ? keys[activeTabIndex] : `Tab-${activeTabIndex}`,
          index: activeTabIndex,
          content: contents ? contents[activeTabIndex] : undefined,
          changeTab,
          count: tabs.length,
        })}
      </TabsContent>
    </div>
  );
};

// const TabsThemer = styled(Tabs)`
//   .Tab {
//     background: ;
//   }
// `;

// const ThemedTabs = withThemeContext(TabsThemer);

export default Tabs;

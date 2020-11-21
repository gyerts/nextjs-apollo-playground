import React, {useState} from 'react';
import {Backdrop, Portal, Sidebar} from '@deity/falcon-ui';
import {Toggle} from "react-powerplug";
import {MenuItems} from "./MenuItems/MenuItems";
import {SubmenuItems} from "./MenuItems/SubmenuItems/SubmenuItems";
import {MobileMenuHeader} from "./MobileMenuHeader/MobileMenuHeader";
import {MobileMenuFooter} from "./MobileMenuFooter/MobileMenuFooter";
import './MobileMenuStyles.scss';

export class SubmenuModel {
    children = [];
    urlPath = '#';
    name = '';
}

export const MobileMenu = ({items}) => {

    const [submenuModel, setSubmenuModel] = useState(new SubmenuModel());

    const onSubmenuModelChange = (submenuModel) => {
        setSubmenuModel(submenuModel);
    }

    const onCloseMobileMenu = (toggle) => {
        setSubmenuModel(new SubmenuModel());
        toggle();
    }

    const onBackToMainMenu = () => {
        onSubmenuModelChange(new SubmenuModel());
    }

    return <React.Fragment>
        <Toggle initial={false}>
            {({on, toggle}) => (
                <React.Fragment>
                    <i className='icon-hamburger' onClick={toggle}/>
                    <Sidebar
                        css={{
                            backgroundColor: '#f8f5f0'
                        }}
                        flexDirection='column'
                        as={Portal}
                        visible={on}
                        p='none'>
                        <MobileMenuHeader onCloseMobileMenu={() => onCloseMobileMenu(toggle)} />
                        <MenuItems
                            onCloseMobileMenu={() => onCloseMobileMenu(toggle)}
                            items={items}
                            onSubmenuModelChange={onSubmenuModelChange}
                            submenuModel={submenuModel} />
                        <SubmenuItems onCloseMobileMenu={() => onCloseMobileMenu(toggle)}
                                      submenuModel={submenuModel}
                                      onBackToMainMenu={onBackToMainMenu} />
                        <MobileMenuFooter />
                    </Sidebar>
                    <Backdrop
                        onClick={toggle}
                        as={Portal}
                        visible={on}
                        css={{
                            opacity: on ? 0.8 : 0
                        }} />
                </React.Fragment>
            )}
        </Toggle>
    </React.Fragment>
};

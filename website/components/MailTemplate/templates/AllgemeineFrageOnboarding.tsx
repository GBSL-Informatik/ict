import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { DynamicInput } from '@tdev-components/DynamicValues';
import MailTemplate, { alignLeft } from '..';
import { translate } from '@docusaurus/Translate';
import { validateEmail, validatePhoneNumber } from '../validations';
import { capitalize } from 'es-toolkit/string';

interface Props {}

const AllgemeineFrageOnboarding = observer((props: Props) => {
    return (
        <div>
            <DynamicInput name="name" label="Name" placeholder="Maria Muster" />
            <DynamicInput name="klasse" label="Klasse" placeholder={translate({ id: 'placeholder.gym1' })} />

            <MailTemplate
                subject="Frage zum Onboarding"
                text="Mail an den IT-Support"
                to={translate({ id: 'support.students.email' })}
                validate={(page) => {
                    const name = page.dynamicValues.get('name');
                    const klasse = page.dynamicValues.get('klasse');
                    if (!name || !klasse) {
                        return () => ({
                            valid: false,
                            message: translate(
                                { id: 'validation.missing-field' },
                                { field: !name ? 'Name' : 'Klasse' }
                            )
                        });
                    }
                    return () => ({ valid: true });
                }}
                body={(page) => {
                    const name = page.dynamicValues.get('name') ?? '';
                    const klasse = page.dynamicValues.get('klasse') ?? '';
                    return alignLeft(`Guten Tag
                
                    Ich habe eine Frage zum Onboarding:
                    
                    
                    Freundlichen Grüsse

                    ${name}, ${klasse}`);
                }}
            />
        </div>
    );
});

export default AllgemeineFrageOnboarding;

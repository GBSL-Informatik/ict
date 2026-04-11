import React from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { DynamicInput } from '@tdev-components/DynamicValues';
import MailTemplate, { alignLeft } from '..';
import { translate } from '@docusaurus/Translate';
import { validateEmail, validatePhoneNumber } from '../validations';
import { capitalize } from 'es-toolkit/string';

const anrede = translate({ id: 'support.edubern.anrede' });
const name = translate({ id: 'support.edubern.name' });

interface Props {}

const ResetOfficeAccount = observer((props: Props) => {
    return (
        <div>
            <DynamicInput name="email" label="E-Mail" placeholder="vorname.nachname@edu.gbsl.ch" />
            <DynamicInput name="phone" label="Telefon" placeholder="079 123 45 66" />

            <MailTemplate
                subject="Office 365 Account zurücksetzen"
                to={translate({ id: 'support.edubern.email' })}
                validate={(page) => {
                    const email = page.dynamicValues.get('email');
                    const emailValidation = validateEmail(email);
                    if (!emailValidation.valid) {
                        return () => emailValidation;
                    }
                    const phone = page.dynamicValues.get('phone');
                    return () => validatePhoneNumber(phone);
                }}
                body={(page) => {
                    const email = page.dynamicValues.get('email') ?? '';
                    const student = email
                        .split('@')[0]
                        .split('.')
                        .map((p) => capitalize(p))
                        .join(' ');
                    const phone = page.dynamicValues.get('phone');
                    return alignLeft(`Guten Tag ${anrede} ${name}
                
                    Bitte setzen Sie meinen Account zurück:
                    
                    Mail: ${email}
                    Telefon: ${phone}
                    
                    Besten Dank und freundliche Grüsse
                    
                    ${student}`);
                }}
            />
        </div>
    );
});

export default ResetOfficeAccount;

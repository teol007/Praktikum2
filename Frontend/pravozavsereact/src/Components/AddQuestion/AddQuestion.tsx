import React from "react";
import { Button, Form } from "react-bootstrap";
import { InputText } from "primereact/inputtext";

interface AddQuestionProps{

}

export default function AddQuestion(): JSX.Element {
  return (
    <div className="container">
        <h2>Vprašalnik</h2> <br />
        <p>Tukaj lahko postavite svoje vprašanje, ki zadeva vaš pravni problem oziroma dilemo.</p> <br /> <br />
        <Form>
            <Form.Group className="mb-3" controlId="formSelect">
                <Form.Select aria-label="Default select example">
                    <option>Pravno področje</option>
                    <option value="stvarnoPravo">Stvarno pravo (npr. nepremičnine, lastninska pravica, stvarne pravice, ...)</option>
                    <option value="kazenskoPravo">Kazensko pravo</option>
                    <option value="prekrskovnoPravo">Prekrškovno pravo</option>
                    <option value="obligacijskoPravo">Obligacijsko pravo (npr. pogodbe, potrošniki, stvarne napake, ...)</option>
                    <option value="odskodnina">Odškodnina</option>
                    <option value="delovnoPravo">Delovno pravo</option>
                    <option value="socialnoPravo">Socialno pravo</option>
                    <option value="druzinskoPravo">Družinsko pravo</option>
                    <option value="dednoPravo">Dedno pravo</option>
                    <option value="izvrsilnoPravo">Izvršilno pravo</option>
                    <option value="stecaj">Stečaj</option>
                    <option value="davcnoPravo">Davčno pravo</option>
                    <option value="drugo">Drugo</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Opis pravnega problema</Form.Label>
                <Form.Text className="text-muted" ><br />
                Tukaj opišite svoj pravni problem.
                </Form.Text>
                <Form.Control as="textarea" rows={3} placeholder="Vaš odgovor" />
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label><br />
                <Form.Text className="text-muted">
                Vpišite e-mail naslov, na katerega bi želeli prejeti odgovor.
                </Form.Text>
                <Form.Control type="email" placeholder="Vaš odgovor" />               
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Ali ste preverili svoj e-mail naslov?</Form.Label> <br />
                <Form.Text className="text-muted">
                Prosimo, da ponovno preverite pravilni zapis vašega elektronskega naslova, da vam bomo lahko zanesljivo posredovali naše mnenje.
                </Form.Text>
                <Form.Check type="checkbox" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Splošnimi pogoji spletnega portala Pravo za vse</Form.Label> <br />
                <Form.Text className="text-muted">
                Ali se strinjate s splošnimi pogoji spletnega portala Pravo za vse, dostopnimi na: https://www.pravozavse.si/splosni-pogoji/?
                </Form.Text>
                <Form.Check type="checkbox" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Politika zasebnosti spletnega portala Pravo za vse</Form.Label> <br />
                <Form.Text className="text-muted">
                Ali se strinjate s politiko zasebnosti spletnega portala Pravo za vse, dostopno na: https://www.pravozavse.si/politika-zasebnosti/?
                </Form.Text>
                <Form.Check type="checkbox" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Pošlji
            </Button> <br />
        </Form>

        <form>
        <div className="flex flex-column gap-2">
            <label htmlFor="username">Username</label>
            <InputText id="username" aria-describedby="username-help" />
            <small id="username-help">
                Enter your username to reset your password.
            </small>
        </div>
        </form>
    </div>
  );
}


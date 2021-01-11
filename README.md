# HUAnnotate
Annotatie Tool om gestructureerde data uit OCR's van scans te verkrijgen

!! Dit project is 'Work in progress'.

## Aanleiding
* Sinds kort zijn de ‘[Adresboeken van de stad Utrecht](https://hetutrechtsarchief.nl/onderzoek/resultaten/archieven?mivast=39&mizig=352&miadt=39&milang=nl&mizk_alle=adresboeken&miview=ldt)’ gepubliceerd op website van Het Utrechts Archief. De adresboeken bevatten voornamelijk lijsten met persoonsnamen, adressen en beroepen. De scans van deze boeken zijn d.m.v. OCR op inhoud doorzoekbaar gemaakt. Dit is een erg mooie ontwikkeling waarmee het publiek nu full-text kan zoeken door zo’n 37.000 pagina’s. Uit onderzoek blijkt echter dat de manier van zoeken onvoldoende aansluit bij de behoefte van de gebruiker. Men verwacht dat de namen in de adresboeken ook vindbaar zijn in de ‘[personendatabase](https://hetutrechtsarchief.nl/onderzoek/resultaten/personen-mais)’ op de website waarin al zo’n 11 miljoen persoonsvermeldingen zijn opgenomen.
* Om dit mogelijk te maken moet er van ‘ruwe’ teksten uit de adresboeken ‘gestructureerde data’ worden gemaakt die in het collectiebeheersysteem kan worden opgenomen. Persoonsnamen, adressen en beroepen worden dan gekoppeld aan de scan en de positie op de scan waar deze informatie vermeld staat. [...] 
* Bij het archief worden regelmatig projecten door vrijwilligers uitgevoerd waarbij scans met persoonsnamen handmatig worden overgetypt. Dit is veel werk en zou in het geval van de adresboeken mogelijk deels automatisch kunnen door het toepassen van moderne technieken. Voor het adresboek van 1860 is hiervoor een proef gedaan waarbij de OCR geconverteerd is naar een [online spreadsheet](https://docs.google.com/spreadsheets/d/1Q0PEbc-84Ze_rFbrCnBRH41sEOHuqk6ceTEqxEMNUQ8/edit?usp=sharing) dmv scripting, spreadsheet-formules, regular expressions, look-up tables en ook nog wat handwerk.
* [Stage opdracht](https://docs.google.com/document/d/13DwrZrvOC_OL0jQChSvOgc0-kadowbwkkJirB00c8R8/edit?usp=sharing): Wij zouden graag de proef voor het semi-automatisch ontsluiten van de Adresboeken een vervolg geven in de vorm van een stageopdracht met een focus op programmeren/scripten/coderen en het omvormen van ‘ruwe tekst’ naar ‘gestructureerde data’. [...]

## Zie ook
* [Annotatie-Experiment repo](https://github.com/hetutrechtsarchief/Annotatie-Experiment)
* [Adresboeken-to-CSV](https://github.com/hetutrechtsarchief/Adresboeken-to-CSV)

## Filmpje van huidige versie
[![HUAnnotate screengrab](http://img.youtube.com/vi/ggIXrlRBZLc/0.jpg)](https://www.youtube.com/watch?v=ggIXrlRBZLc "HUAnnotate")

## Install
```bash
#'--recursive' omdat deze een git submodule bevat met 'data'
git clone --recursive https://github.com/hetutrechtsarchief/HUAnnotate.git 

serve # of een ander commando om een webserver te starten.
```

## Vervolg
Op dit moment wordt gebruikt gemaakt van de Javascript library [P5js](https://p5js.org/). De code is modulair opgebouwd in classes maar er wordt geen gebruik gemaakt van een HTML/DOM structuur. Dit zorgt nu voor opschalingsproblemen waardoor we nu willen overstappen naar een framework zoals Angular, React of VUE. We hebben gekozen voor VUE en het omzetten begint in januari 2021 met hulp van @hay.








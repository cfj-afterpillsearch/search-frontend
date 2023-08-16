import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'newlineToBrPipe',
    standalone: true,
})
export class NewlineToBrPipe implements PipeTransform {
transform(value: string): string {
    return value.replace(/\r?\n+/g, '<br />');
}
}
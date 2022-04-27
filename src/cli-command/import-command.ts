import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createOffer, getErrorMessage} from '../utils/common.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    try {
      const fileReader = new TSVFileReader(filename.trim());
      fileReader.on('line', this.onLine);
      fileReader.on('end', this.onComplete);
      await fileReader.read();
    } catch (err) {
      if (err instanceof TypeError) {
        console.log(`file name not specified: ${getErrorMessage(err)}`);
      } else {
        console.log(`Can't read the file: ${getErrorMessage(err)}`);
      }
    }
  }

}

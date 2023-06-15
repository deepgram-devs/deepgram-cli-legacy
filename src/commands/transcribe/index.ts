import SecureCommand from "../../secure";

export default class Transcribe extends SecureCommand {
  static description = "Transcribe audio/video straight from the command line.";

  public async run(): Promise<void> {
    // const { projects } = await this.deepgram.transcription.preRecorded()
    // this.output("test");
  }
}

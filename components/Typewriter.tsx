import TypeWriter from 'typewriter-effect';

type Props = {}

const TypewriterEffect = (props: Props) => {
    const typewriterPause: number = 3000;

  return (
    <TypeWriter 
        options={{
            loop: true,
        }}
        onInit={(typewriter) => {
            typewriter.typeString('Full-Stack')
            .pauseFor(3000).deleteAll()
            .typeString('Python')
            .pauseFor(3000).deleteAll()
            .start()

        }}
    />
  )
}

export default TypewriterEffect
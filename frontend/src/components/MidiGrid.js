import React, { useState, useEffect } from 'react';
import { Synth, PolySynth, now } from 'tone';

const ROWS = 24;  // 4 octaves
const COLS = 24;   // 1/8th notes

function intToNoteName(intValue) {
    // Define the octave by floor-dividing the integer value by 12.
    const octave = Math.floor(intValue / 12) - 1;
    // The notes in an octave.
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    // Get the note name by taking the modulo of the integer value with 12. 
    // This will give the remainder, which corresponds to a note in the 'notes' array.
    return notes[intValue % 12] + octave;
}

function Keyboard() {
  const keys = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];

  return (
    <div className="keyboard">
      {keys.map((key, index) => (
        <div key={index} className={`key ${key.includes('#') ? 'black' : 'white'}`}></div>
      ))}
    </div>
  );
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function MidiGrid() {
    const synth = new PolySynth(Synth).toDestination();
    const [grid, setGrid] = useState(generateEmptyGrid());
    const [playhead, setPlayhead] = useState(0);
    const [userId, setUserId] = useState(null)

    console.log(userId)
    const csrftoken = getCookie('csrftoken')
    
    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    useEffect(() => {
      setUserId(getCookie('user_id'))
    }, [])

    async function saveSong() {
        console.log('grid', grid)
        try {
            console.log(
              JSON.stringify(
                {
                  song_data: grid,
                  user_id: userId
                })
            )
            const response = await fetch('/api/saveSong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(
                  {
                    song_data: grid,
                    user_id: userId
                  })
            });

            const data = await response.json();

            if (data.status === 'success') {
                console.log(`Song saved with ID: ${data.song_id}`);
            } else {
                console.error('Oh butts.', data.error);
            }
        } catch (error) {
            console.error('Failed to save song:', error);
        }
    }

    function playNote(note) {
        const _now = now()
        // const oscillator = audioContext.createOscillator();
        // oscillator.type = 'sine';
        // oscillator.frequency.setValueAtTime(Math.pow(2, (note - 49) / 12) * 440, audioContext.currentTime); // Convert MIDI note number to frequency
        // oscillator.connect(audioContext.destination);
        // oscillator.start();
        // oscillator.stop(audioContext.currentTime + 0.125); // Play note for the duration of an eighth note
        synth.triggerAttack(intToNoteName(note), '8n')
        synth.triggerRelease(note, _now + 0.25)
    }

    useEffect(() => {
    for (let i = 0; i < ROWS; i++) {
        if (grid[i][playhead]) {
        playNote(i + 48);  // Assuming the grid starts at MIDI note number 24 (C1) and increases by 1 for each row
        }
    }
    }, [playhead]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayhead(prev => (prev + 1) % COLS); // loop back to start after reaching the end
    }, 250); // Change this timing based on BPM
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className="grid-container">
        <button onClick={saveSong}>Save</button>

        <Keyboard/>
        {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
                <div 
                key={colIndex} 
                className={`cell ${colIndex === playhead ? 'active' : ''} ${cell ? 'on' : ''}`} 
                onClick={() => toggleCell(rowIndex, colIndex)}
                ></div>
            ))}
            </div>
        ))}
    </div>
  );

  function generateEmptyGrid() {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      rows.push(Array.from(Array(COLS), () => 0));
    }
    return rows;
  }

    function toggleCell(row, col) {
        // Clone the current grid state
        const newGrid = grid.slice();
      
        // Toggle the cell's state
        newGrid[row][col] = +!newGrid[row][col];
      
        // If the cell is now 'on', play the corresponding note
        if (newGrid[row][col]) {
          playNote(row + 48); // Assuming the grid starts at MIDI note number 24 (C1) and increases by 1 for each row
        }
      
        // Update the grid state
        setGrid(newGrid);
      }

}

export default MidiGrid;

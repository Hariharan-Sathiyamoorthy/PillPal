// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicationReminder {
    uint256 public medCount = 0;

    struct Medication {
        uint256 id;
        string name;
        uint256 dosage;
        bool taken;
    }

    mapping(address => Medication[]) public medications;

    event MediactionCreated(
        uint256 id,
        string name,
        uint256 dosage,
        bool taken
    );

    event MedTaken(uint256 id, bool taken);

    //   constructor() public {
    //     createTask("Check out dappuniversity.com");
    //   }

    function addMedication(string memory _name, uint256 _dosage) public {
        medCount++;
        Medication memory newMedication = Medication(
            medCount,
            _name,
            _dosage,
            false
        );
        medications[msg.sender].push(newMedication);
        emit MediactionCreated(medCount, _name, _dosage, false);
    }

    function toggleTaken(uint256 _id) public {
        Medication storage medication = medications[msg.sender][_id];
        medication.taken = !medication.taken;
        emit MedTaken(_id, medication.taken);
    }

    function getMedicationCount() public view returns (uint256) {
        return medications[msg.sender].length;
    }

    function getMedication(uint256 _index)
        public
        view
        returns (
            uint256 id,
            string memory name,
            uint256 dosage,
            bool taken
        )
    {
        Medication memory _med = medications[msg.sender][_index];
        return (_med.id, _med.name, _med.dosage, _med.taken);
    }
}

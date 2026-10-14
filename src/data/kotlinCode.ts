import { KotlinFile } from '../types/android';

export const KOTLIN_FILES: KotlinFile[] = [
  {
    id: 'build-gradle-kts',
    name: 'build.gradle.kts (Module :app)',
    path: 'app/build.gradle.kts',
    category: 'gradle',
    description: 'Configuración de Gradle con dependencias de Jetpack Compose, Room, CameraX, Fused Location y Hilt.',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
    alias(libs.plugins.hilt.android)
}

android {
    namespace = "com.geocam.offline"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.geocam.offline"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Core & Lifecycle
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)

    // Jetpack Compose
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.material.icons.extended)

    // Room Database
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    kapt(libs.androidx.room.compiler)

    // Google Play Services - Fused Location Provider (Funciona 100% por Hardware GPS)
    implementation(libs.play.services.location)

    // CameraX (Librería recomendada de Android para manejo de Cámara)
    implementation(libs.androidx.camera.core)
    implementation(libs.androidx.camera.camera2)
    implementation(libs.androidx.camera.lifecycle)
    implementation(libs.androidx.camera.view)

    // Coil para Carga de Imágenes en Compose
    implementation(libs.coil.compose)

    // Hilt - Inyección de Dependencias
    implementation(libs.hilt.android)
    kapt(libs.hilt.compiler)
    implementation(libs.androidx.hilt.navigation.compose)

    // Kotlin Coroutines
    implementation(libs.kotlinx.coroutines.android)
    implementation(libs.kotlinx.coroutines.play.services)

    // Tests
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
}`
  },
  {
    id: 'libs-versions-toml',
    name: 'libs.versions.toml',
    path: 'gradle/libs.versions.toml',
    category: 'gradle',
    description: 'Catálogo de versiones centralizado de Gradle (Gradle Version Catalog).',
    code: `[versions]
agp = "8.2.2"
kotlin = "1.9.22"
coreKtx = "1.12.0"
lifecycleRuntimeKtx = "2.7.0"
activityCompose = "1.8.2"
composeBom = "2024.02.00"
room = "2.6.1"
playServicesLocation = "21.1.0"
camerax = "1.3.1"
coil = "2.5.0"
hilt = "2.50"
hiltNavigationCompose = "1.1.0"
navigationCompose = "2.7.7"
junit = "4.13.2"
junitExt = "1.1.5"
espresso = "3.5.1"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest" }
androidx-ui-test-junit4 = { group = "androidx.compose.ui", name = "ui-test-junit4" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleRuntimeKtx" }

# Room
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room" }
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }

# Play Services Location
play-services-location = { group = "com.google.android.gms", name = "play-services-location", version.ref = "playServicesLocation" }

# CameraX
androidx-camera-core = { group = "androidx.camera", name = "camera-core", version.ref = "camerax" }
androidx-camera-camera2 = { group = "androidx.camera", name = "camera-camera2", version.ref = "camerax" }
androidx-camera-lifecycle = { group = "androidx.camera", name = "camera-lifecycle", version.ref = "camerax" }
androidx-camera-view = { group = "androidx.camera", name = "camera-view", version.ref = "camerax" }

# Coil
coil-compose = { group = "io.coil-kt", name = "coil-compose", version.ref = "coil" }

# Hilt
hilt-android = { group = "com.google.dagger", name = "hilt-android", version.ref = "hilt" }
hilt-compiler = { group = "com.google.dagger", name = "hilt-compiler", version.ref = "hilt" }
androidx-hilt-navigation-compose = { group = "androidx.hilt", name = "hilt-navigation-compose", version.ref = "hiltNavigationCompose" }

# Coroutines
kotlinx-coroutines-android = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-android", version = "1.7.3" }
kotlinx-coroutines-play-services = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-play-services", version = "1.7.3" }

# Testing
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitExt" }
androidx-espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espresso" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-kapt = { id = "org.jetbrains.kotlin.kapt", version.ref = "kotlin" }
hilt-android = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }`
  },
  {
    id: 'capture-entity',
    name: 'CaptureRecord.kt (Entity)',
    path: 'app/src/main/java/com/geocam/offline/data/local/entity/CaptureRecord.kt',
    category: 'data',
    description: 'Entidad Room DB que define la tabla capture_records con UUID, GPS y ruta interna de foto.',
    code: `package com.geocam.offline.data.local.entity

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.UUID

/**
 * Entidad principal de Room para el almacenamiento local de capturas georreferenciadas.
 * Diseñada para funcionamiento 100% OFFLINE-FIRST.
 */
@Entity(tableName = "capture_records")
data class CaptureRecord(
    @PrimaryKey
    @ColumnInfo(name = "id")
    val id: String = UUID.randomUUID().toString(),

    @ColumnInfo(name = "created_at")
    val createdAt: String, // Timestamp ISO 8601 (ej: "2023-10-24T11:24:36Z")

    @ColumnInfo(name = "latitude")
    val latitude: Double,

    @ColumnInfo(name = "longitude")
    val longitude: Double,

    @ColumnInfo(name = "accuracy_meters")
    val accuracyMeters: Float,

    @ColumnInfo(name = "altitude_meters")
    val altitudeMeters: Double? = null,

    @ColumnInfo(name = "photo_path")
    val photoPath: String, // Ruta absoluta del archivo en context.filesDir

    @ColumnInfo(name = "note")
    val note: String? = null,

    @ColumnInfo(name = "sync_status")
    val syncStatus: String = SYNC_PENDING // "PENDING" o "SYNCED"
) {
    companion object {
        const val SYNC_PENDING = "PENDING"
        const val SYNC_SYNCED = "SYNCED"
    }
}`
  },
  {
    id: 'capture-dao',
    name: 'CaptureDao.kt (DAO)',
    path: 'app/src/main/java/com/geocam/offline/data/local/dao/CaptureDao.kt',
    category: 'data',
    description: 'Data Access Object con consultas reactivas mediante Kotlin Flow para Room.',
    code: `package com.geocam.offline.data.local.dao

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.geocam.offline.data.local.entity.CaptureRecord
import kotlinx.coroutines.flow.Flow

@Dao
interface CaptureDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCaptureRecord(record: CaptureRecord)

    @Query("SELECT * FROM capture_records ORDER BY created_at DESC")
    fun getAllRecords(): Flow<List<CaptureRecord>>

    @Query("SELECT * FROM capture_records WHERE id = :id LIMIT 1")
    suspend fun getRecordById(id: String): CaptureRecord?

    @Query("SELECT * FROM capture_records WHERE sync_status = 'PENDING'")
    fun getPendingSyncRecords(): Flow<List<CaptureRecord>>

    @Query("UPDATE capture_records SET sync_status = :status WHERE id = :id")
    suspend fun updateSyncStatus(id: String, status: String)

    @Delete
    suspend fun deleteRecord(record: CaptureRecord)

    @Query("DELETE FROM capture_records WHERE id = :id")
    suspend fun deleteRecordById(id: String)
}`
  },
  {
    id: 'app-database',
    name: 'AppDatabase.kt',
    path: 'app/src/main/java/com/geocam/offline/data/local/AppDatabase.kt',
    category: 'data',
    description: 'Definición de RoomDatabase y versionado de la base de datos local SQLite.',
    code: `package com.geocam.offline.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.geocam.offline.data.local.dao.CaptureDao
import com.geocam.offline.data.local.entity.CaptureRecord

@Database(
    entities = [CaptureRecord::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun captureDao(): CaptureDao

    companion object {
        const val DATABASE_NAME = "geocam_offline.db"
    }
}`
  },
  {
    id: 'capture-repository',
    name: 'CaptureRepository.kt (Domain & Data)',
    path: 'app/src/main/java/com/geocam/offline/domain/repository/CaptureRepository.kt',
    category: 'domain',
    description: 'Interfaz del repositorio que abstrae las operaciones sobre Room DB y el almacenamiento de archivos.',
    code: `package com.geocam.offline.domain.repository

import com.geocam.offline.data.local.entity.CaptureRecord
import kotlinx.coroutines.flow.Flow
import java.io.File

interface CaptureRepository {
    fun getAllRecords(): Flow<List<CaptureRecord>>
    fun getPendingRecords(): Flow<List<CaptureRecord>>
    suspend fun getRecordById(id: String): CaptureRecord?
    suspend fun saveCaptureRecord(record: CaptureRecord): Boolean
    suspend fun updateSyncStatus(id: String, status: String)
    suspend fun deleteCaptureRecord(record: CaptureRecord): Boolean
    suspend fun createTempPhotoFile(): File
}`
  },
  {
    id: 'capture-repository-impl',
    name: 'CaptureRepositoryImpl.kt',
    path: 'app/src/main/java/com/geocam/offline/data/repository/CaptureRepositoryImpl.kt',
    category: 'data',
    description: 'Implementación concreta del repositorio interactuando con Room DAO y filesDir.',
    code: `package com.geocam.offline.data.repository

import android.content.Context
import com.geocam.offline.data.local.dao.CaptureDao
import com.geocam.offline.data.local.entity.CaptureRecord
import com.geocam.offline.domain.repository.CaptureRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CaptureRepositoryImpl @Inject constructor(
    private val context: Context,
    private val captureDao: CaptureDao
) : CaptureRepository {

    override fun getAllRecords(): Flow<List<CaptureRecord>> = captureDao.getAllRecords()

    override fun getPendingRecords(): Flow<List<CaptureRecord>> = captureDao.getPendingSyncRecords()

    override suspend fun getRecordById(id: String): CaptureRecord? {
        return withContext(Dispatchers.IO) {
            captureDao.getRecordById(id)
        }
    }

    override suspend fun saveCaptureRecord(record: CaptureRecord): Boolean {
        return withContext(Dispatchers.IO) {
            try {
                captureDao.insertCaptureRecord(record)
                true
            } catch (e: Exception) {
                e.printStackTrace()
                false
            }
        }
    }

    override suspend fun updateSyncStatus(id: String, status: String) {
        withContext(Dispatchers.IO) {
            captureDao.updateSyncStatus(id, status)
        }
    }

    override suspend fun deleteCaptureRecord(record: CaptureRecord): Boolean {
        return withContext(Dispatchers.IO) {
            try {
                // 1. Eliminar archivo físico de foto en context.filesDir
                val file = File(record.photoPath)
                if (file.exists()) {
                    file.delete()
                }
                // 2. Eliminar registro en Room DB
                captureDao.deleteRecord(record)
                true
            } catch (e: Exception) {
                e.printStackTrace()
                false
            }
        }
    }

    override suspend fun createTempPhotoFile(): File {
        return withContext(Dispatchers.IO) {
            val storageDir = File(context.filesDir, "captures")
            if (!storageDir.exists()) {
                storageDir.mkdirs()
            }
            val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.US).format(Date())
            File.createTempFile("IMG_\${timestamp}_", ".jpg", storageDir)
        }
    }
}`
  },
  {
    id: 'fused-location-manager',
    name: 'LocationClient.kt (GPS Provider)',
    path: 'app/src/main/java/com/geocam/offline/location/LocationClient.kt',
    category: 'location',
    description: 'Gestor de ubicación con FusedLocationProviderClient prioridad PRIORITY_HIGH_ACCURACY (chip GPS sin datos celular).',
    code: `package com.geocam.offline.location

import android.annotation.SuppressLint
import android.content.Context
import android.location.Location
import android.location.LocationManager
import android.os.Looper
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import javax.inject.Inject

class LocationClient @Inject constructor(
    private val context: Context
) {
    private val fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)

    fun isGpsEnabled(): Boolean {
        val locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)
    }

    @SuppressLint("MissingPermission")
    fun getLocationUpdates(intervalMs: Long = 3000L): Flow<Location> = callbackFlow {
        if (!isGpsEnabled()) {
            close(IllegalStateException("GPS_DISABLED"))
            return@callbackFlow
        }

        // Prioridad máxima para precisión con chip de Hardware GPS
        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, intervalMs)
            .setMinUpdateIntervalMillis(1500L)
            .setWaitForAccurateLocation(true)
            .build()

        val locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                result.lastLocation?.let { location ->
                    trySend(location)
                }
            }
        }

        fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.getMainLooper()
        )

        awaitClose {
            fusedLocationClient.removeLocationUpdates(locationCallback)
        }
    }
}`
  },
  {
    id: 'camerax-manager',
    name: 'CameraXManager.kt',
    path: 'app/src/main/java/com/geocam/offline/camera/CameraXManager.kt',
    category: 'camera',
    description: 'Manejo de vista previa y captura de fotos guardando en el directorio privado context.filesDir.',
    code: `package com.geocam.offline.camera

import android.content.Context
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import java.io.File
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class CameraXManager(private val context: Context) {

    private var imageCapture: ImageCapture? = null

    suspend fun startCamera(
        lifecycleOwner: LifecycleOwner,
        previewView: PreviewView
    ) = suspendCoroutine { continuation ->
        val cameraProviderFuture = ProcessCameraProvider.getInstance(context)

        cameraProviderFuture.addListener({
            try {
                val cameraProvider = cameraProviderFuture.get()
                val preview = Preview.Builder().build().also {
                    it.setSurfaceProvider(previewView.surfaceProvider)
                }

                imageCapture = ImageCapture.Builder()
                    .setCaptureMode(ImageCapture.CAPTURE_MODE_MAXIMIZE_QUALITY)
                    .build()

                val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    lifecycleOwner,
                    cameraSelector,
                    preview,
                    imageCapture
                )
                continuation.resume(Unit)
            } catch (exc: Exception) {
                continuation.resumeWithException(exc)
            }
        }, ContextCompat.getMainExecutor(context))
    }

    fun takePhoto(
        outputFile: File,
        onPhotoCaptured: (File) -> Unit,
        onError: (ImageCaptureException) -> Unit
    ) {
        val capture = imageCapture ?: return

        val outputOptions = ImageCapture.OutputFileOptions.Builder(outputFile).build()

        capture.takePicture(
            outputOptions,
            ContextCompat.getMainExecutor(context),
            object : ImageCapture.OnImageSavedCallback {
                override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                    onPhotoCaptured(outputFile)
                }

                override fun onError(exception: ImageCaptureException) {
                    onError(exception)
                }
            }
        )
    }
}`
  },
  {
    id: 'capture-viewmodel',
    name: 'CaptureViewModel.kt',
    path: 'app/src/main/java/com/geocam/offline/ui/viewmodel/CaptureViewModel.kt',
    category: 'viewmodel',
    description: 'ViewModel con StateFlow para coordinar la captura de foto, coordenadas GPS y validaciones de precisión (>25m).',
    code: `package com.geocam.offline.ui.viewmodel

import android.location.Location
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.geocam.offline.data.local.entity.CaptureRecord
import com.geocam.offline.domain.repository.CaptureRepository
import com.geocam.offline.location.LocationClient
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.io.File
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import java.util.UUID
import javax.inject.Inject

data class NewCaptureUiState(
    val location: Location? = null,
    val isFetchingLocation: Boolean = false,
    val capturedPhotoFile: File? = null,
    val note: String = "",
    val showLowAccuracyDialog: Boolean = false,
    val showGpsDisabledDialog: Boolean = false,
    val isSaving: Boolean = false,
    val saveSuccess: Boolean = false,
    val errorMessage: String? = null
)

@HiltViewModel
class CaptureViewModel @Inject constructor(
    private val repository: CaptureRepository,
    private val locationClient: LocationClient
) : ViewModel() {

    private val _uiState = MutableStateFlow(NewCaptureUiState())
    val uiState: StateFlow<NewCaptureUiState> = _uiState.asStateFlow()

    val allRecords = repository.getAllRecords()

    init {
        refreshLocation()
    }

    fun refreshLocation() {
        if (!locationClient.isGpsEnabled()) {
            _uiState.update { it.copy(showGpsDisabledDialog = true, isFetchingLocation = false) }
            return
        }

        viewModelScope.launch {
            _uiState.update { it.copy(isFetchingLocation = true) }
            locationClient.getLocationUpdates()
                .catch { e ->
                    _uiState.update { it.copy(isFetchingLocation = false, errorMessage = e.message) }
                }
                .collectLatest { location ->
                    _uiState.update { 
                        it.copy(location = location, isFetchingLocation = false) 
                    }
                }
        }
    }

    fun onPhotoCaptured(file: File) {
        _uiState.update { it.copy(capturedPhotoFile = file) }
    }

    fun onNoteChanged(newNote: String) {
        _uiState.update { it.copy(note = newNote) }
    }

    fun dismissLowAccuracyDialog() {
        _uiState.update { it.copy(showLowAccuracyDialog = false) }
    }

    fun dismissGpsDisabledDialog() {
        _uiState.update { it.copy(showGpsDisabledDialog = false) }
    }

    fun attemptSaveRecord() {
        val currentLocation = _uiState.value.location ?: return
        
        // REQUISITO: Alerta si la precisión es mayor a 25 metros
        if (currentLocation.accuracy > 25.0f) {
            _uiState.update { it.copy(showLowAccuracyDialog = true) }
        } else {
            saveRecordConfirmed()
        }
    }

    fun saveRecordConfirmed() {
        val state = _uiState.value
        val loc = state.location ?: return
        val photoFile = state.capturedPhotoFile ?: return

        viewModelScope.launch {
            _uiState.update { it.copy(isSaving = true, showLowAccuracyDialog = false) }

            val isoFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US)
            isoFormat.timeZone = TimeZone.getTimeZone("UTC")

            val record = CaptureRecord(
                id = UUID.randomUUID().toString(),
                createdAt = isoFormat.format(Date()),
                latitude = loc.latitude,
                longitude = loc.longitude,
                accuracyMeters = loc.accuracy,
                altitudeMeters = if (loc.hasAltitude()) loc.altitude else null,
                photoPath = photoFile.absolutePath,
                note = state.note.ifBlank { null },
                syncStatus = CaptureRecord.SYNC_PENDING
            )

            val success = repository.saveCaptureRecord(record)
            _uiState.update { 
                it.copy(
                    isSaving = false, 
                    saveSuccess = success,
                    capturedPhotoFile = null,
                    note = ""
                ) 
            }
        }
    }

    fun deleteRecord(record: CaptureRecord) {
        viewModelScope.launch {
            repository.deleteCaptureRecord(record)
        }
    }

    fun toggleSyncStatus(id: String, currentStatus: String) {
        viewModelScope.launch {
            val nextStatus = if (currentStatus == CaptureRecord.SYNC_PENDING) 
                CaptureRecord.SYNC_SYNCED else CaptureRecord.SYNC_PENDING
            repository.updateSyncStatus(id, nextStatus)
        }
    }

    suspend fun getTempPhotoFile(): File = repository.createTempPhotoFile()
}`
  },
  {
    id: 'new-capture-screen',
    name: 'NewCaptureScreen.kt (Compose)',
    path: 'app/src/main/java/com/geocam/offline/ui/screens/NewCaptureScreen.kt',
    category: 'ui',
    description: 'Pantalla 1 "Nueva Captura" con indicador de precisión GPS, visor de cámara, nota opcional y alertas.',
    code: `package com.geocam.offline.ui.screens

import android.content.Intent
import android.provider.Settings
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.geocam.offline.ui.viewmodel.CaptureViewModel

@Composable
fun NewCaptureScreen(
    viewModel: CaptureViewModel,
    onNavigateToHistory: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val context = LocalContext.current

    // Colores dinámicos para la precisión del GPS
    val (accuracyColor, accuracyText) = when {
        uiState.location == null -> Color.Gray to "Obteniendo GPS..."
        uiState.location!!.accuracy < 15f -> Color(0xFF10B981) to "Excelente (\${uiState.location!!.accuracy.toInt()}m)"
        uiState.location!!.accuracy <= 30f -> Color(0xFFF59E0B) to "Aceptable (\${uiState.location!!.accuracy.toInt()}m)"
        else -> Color(0xFFEF4444) to "Baja (\${uiState.location!!.accuracy.toInt()}m)"
    }

    val canSave = uiState.location != null && uiState.capturedPhotoFile != null && !uiState.isSaving

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0F172A))
    ) {
        // Banner Superior - Modo Sin Conexión (Offline First)
        Surface(
            color = Color(0xFFEAB308),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(vertical = 6.dp, horizontal = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.WifiOff,
                    contentDescription = null,
                    tint = Color.Black,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Modo sin conexión active (Hardware GPS)",
                    color = Color.Black,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Indicador de GPS y Coordenadas
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B)),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(12.dp)
                                    .background(accuracyColor, CircleShape)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "GPS: $accuracyText",
                                color = accuracyColor,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        if (uiState.location != null) {
                            Text(
                                text = "Lat: \${uiState.location!!.latitude.toString().take(9)}° | Lon: \${uiState.location!!.longitude.toString().take(9)}°",
                                color = Color.White,
                                fontSize = 13.sp
                            )
                            if (uiState.location!!.hasAltitude()) {
                                Text(
                                    text = "Alt: \${uiState.location!!.altitude.toInt()} m",
                                    color = Color.LightGray,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }

                    IconButton(
                        onClick = { viewModel.refreshLocation() },
                        modifier = Modifier.background(Color(0xFF334155), CircleShape)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Refrescar GPS",
                            tint = Color.White
                        )
                    }
                }
            }

            // Visor de Cámara / Foto Capturada
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(vertical = 12.dp)
                    .background(Color.Black, RoundedCornerShape(16.dp))
                    .border(1.dp, Color(0xFF334155), RoundedCornerShape(16.dp)),
                contentAlignment = Alignment.Center
            ) {
                if (uiState.capturedPhotoFile != null) {
                    Text(
                        text = "Foto Lista: \${uiState.capturedPhotoFile!!.name}",
                        color = Color.Green,
                        fontWeight = FontWeight.Bold
                    )
                } else {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Icon(
                            imageVector = Icons.Default.PhotoCamera,
                            contentDescription = null,
                            tint = Color.Gray,
                            modifier = Modifier.size(48.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("Presiona el botón para tomar la foto", color = Color.Gray)
                    }
                }
            }

            // Campo de Notas
            OutlinedTextField(
                value = uiState.note,
                onValueChange = { viewModel.onNoteChanged(it) },
                label = { Text("Notas de campo (Opcional)", color = Color.Gray) },
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = Color(0xFF38BDF8),
                    unfocusedBorderColor = Color(0xFF334155),
                    focusedTextColor = Color.White,
                    unfocusedTextColor = Color.White
                ),
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Botón Guardar Registro
            Button(
                onClick = { viewModel.attemptSaveRecord() },
                enabled = canSave,
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF2563EB),
                    disabledContainerColor = Color(0xFF334155)
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(imageVector = Icons.Default.Save, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Guardar Registro Local", fontSize = 16.sp, fontWeight = FontWeight.Bold)
            }
        }
    }

    // Alerta de GPS de Baja Precisión (>25 metros)
    if (uiState.showLowAccuracyDialog) {
        AlertDialog(
            onDismissRequest = { viewModel.dismissLowAccuracyDialog() },
            title = { Text("Precisión GPS Baja (>25m)") },
            text = { Text("La precisión actual es de \${uiState.location?.accuracy?.toInt()} metros. ¿Deseas guardar de todos modos?") },
            confirmButton = {
                TextButton(onClick = { viewModel.saveRecordConfirmed() }) {
                    Text("Sí, Guardar", color = Color(0xFFEF4444))
                }
            },
            dismissButton = {
                TextButton(onClick = { viewModel.dismissLowAccuracyDialog() }) {
                    Text("Cancelar")
                }
            }
        )
    }

    // Alerta de GPS Apagado
    if (uiState.showGpsDisabledDialog) {
        AlertDialog(
            onDismissRequest = { viewModel.dismissGpsDisabledDialog() },
            title = { Text("GPS Desactivado") },
            text = { Text("Para georreferenciar la captura es necesario activar el GPS del dispositivo.") },
            confirmButton = {
                TextButton(onClick = {
                    viewModel.dismissGpsDisabledDialog()
                    context.startActivity(Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS))
                }) {
                    Text("Ir a Ajustes")
                }
            },
            dismissButton = {
                TextButton(onClick = { viewModel.dismissGpsDisabledDialog() }) {
                    Text("Cerrar")
                }
            }
        )
    }
}`
  },
  {
    id: 'history-screen',
    name: 'HistoryScreen.kt (Compose)',
    path: 'app/src/main/java/com/geocam/offline/ui/screens/HistoryScreen.kt',
    category: 'ui',
    description: 'Pantalla 2 "Historial de Capturas" con LazyColumn, miniaturas, coordenadas y estado de sincronización.',
    code: `package com.geocam.offline.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.SyncDisabled
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.geocam.offline.data.local.entity.CaptureRecord
import com.geocam.offline.ui.viewmodel.CaptureViewModel
import java.io.File

@Composable
fun HistoryScreen(
    viewModel: CaptureViewModel,
    onRecordClick: (String) -> Unit
) {
    val records by viewModel.allRecords.collectAsState(initial = emptyList())

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0F172A))
            .padding(16.dp)
    ) {
        Text(
            text = "Historial de Capturas (\${records.size})",
            color = Color.White,
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        if (records.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No hay capturas guardadas en la base de datos.",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(records, key = { it.id }) { record ->
                    CaptureItemCard(
                        record = record,
                        onClick = { onRecordClick(record.id) }
                    )
                }
            }
        }
    }
}

@Composable
fun CaptureItemCard(
    record: CaptureRecord,
    onClick: () -> Unit
) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B)),
        shape = RoundedCornerShape(12.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Miniatura de la foto guardada en context.filesDir
            AsyncImage(
                model = File(record.photoPath),
                contentDescription = "Miniatura",
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .size(70.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color.Black)
            )

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = record.createdAt.take(19).replace("T", " "),
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "Lat: \${record.latitude.toString().take(8)}° | Lon: \${record.longitude.toString().take(8)}°",
                    color = Color(0xFF94A3B8),
                    fontSize = 12.sp
                )
                Text(
                    text = "Precisión: \${record.accuracyMeters.toInt()}m",
                    color = if (record.accuracyMeters < 15) Color(0xFF10B981) else Color(0xFFF59E0B),
                    fontSize = 12.sp
                )
            }

            // Badge de Estado de Sincronización
            Surface(
                color = if (record.syncStatus == CaptureRecord.SYNC_SYNCED) Color(0xFF059669) else Color(0xFFD97706),
                shape = RoundedCornerShape(16.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = if (record.syncStatus == CaptureRecord.SYNC_SYNCED) Icons.Default.Sync else Icons.Default.SyncDisabled,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(12.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = record.syncStatus,
                        color = Color.White,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }
    }
}`
  },
  {
    id: 'detail-screen',
    name: 'DetailScreen.kt (Compose)',
    path: 'app/src/main/java/com/geocam/offline/ui/screens/DetailScreen.kt',
    category: 'ui',
    description: 'Pantalla 3 "Detalle de Captura" con vista completa de foto, metadatos y opción de eliminar.',
    code: `package com.geocam.offline.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.geocam.offline.data.local.entity.CaptureRecord
import com.geocam.offline.ui.viewmodel.CaptureViewModel
import java.io.File

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailScreen(
    recordId: String,
    viewModel: CaptureViewModel,
    onBack: () -> Unit
) {
    val records by viewModel.allRecords.collectAsState(initial = emptyList())
    val record = records.find { it.id == recordId }
    var showDeleteConfirm by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Detalle de Captura", color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Volver", tint = Color.White)
                    }
                },
                actions = {
                    IconButton(onClick = { showDeleteConfirm = true }) {
                        Icon(Icons.Default.Delete, contentDescription = "Eliminar", tint = Color(0xFFEF4444))
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF0F172A))
            )
        },
        containerColor = Color(0xFF0F172A)
    ) { paddingValues ->
        if (record == null) {
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Cargando o registro no encontrado...", color = Color.Gray)
            }
            return@Scaffold
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            // Foto completa
            AsyncImage(
                model = File(record.photoPath),
                contentDescription = "Foto completa",
                contentScale = ContentScale.Fit,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(260.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.Black)
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Metadatos
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B)),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("Metadatos Georreferenciados", color = Color(0xFF38BDF8), fontWeight = FontWeight.Bold, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(12.dp))

                    MetadataRow("ID (UUID):", record.id)
                    MetadataRow("Fecha/Hora:", record.createdAt)
                    MetadataRow("Latitud:", "\${record.latitude}°")
                    MetadataRow("Longitud:", "\${record.longitude}°")
                    MetadataRow("Precisión GPS:", "\${record.accuracyMeters} metros")
                    MetadataRow("Altitud:", record.altitudeMeters?.let { "\$it m" } ?: "N/D")
                    MetadataRow("Ruta de archivo:", record.photoPath)
                    MetadataRow("Sincronización:", record.syncStatus)
                }
            }

            if (!record.note.isNullOrBlank()) {
                Spacer(modifier = Modifier.height(12.dp))
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B)),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text("Notas de Campo", color = Color.White, fontWeight = FontWeight.Bold)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(record.note, color = Color(0xFFCBD5E1))
                    }
                }
            }
        }
    }

    if (showDeleteConfirm) {
        AlertDialog(
            onDismissRequest = { showDeleteConfirm = false },
            title = { Text("Eliminar Registro") },
            text = { Text("¿Deseas eliminar este registro de la base de datos local y borrar la foto de filesDir?") },
            confirmButton = {
                TextButton(onClick = {
                    record?.let { viewModel.deleteRecord(it) }
                    showDeleteConfirm = false
                    onBack()
                }) {
                    Text("Eliminar", color = Color(0xFFEF4444))
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteConfirm = false }) { Text("Cancelar") }
            }
        )
    }
}

@Composable
private fun MetadataRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(label, color = Color.Gray, fontSize = 13.sp)
        Text(value, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Medium)
    }
}`
  },
  {
    id: 'database-module',
    name: 'DatabaseModule.kt (Hilt DI)',
    path: 'app/src/main/java/com/geocam/offline/di/DatabaseModule.kt',
    category: 'di',
    description: 'Módulo de Hilt para la inyección de dependencias de Room DB y Repositorio.',
    code: `package com.geocam.offline.di

import android.content.Context
import androidx.room.Room
import com.geocam.offline.data.local.AppDatabase
import com.geocam.offline.data.local.dao.CaptureDao
import com.geocam.offline.data.repository.CaptureRepositoryImpl
import com.geocam.offline.domain.repository.CaptureRepository
import com.geocam.offline.location.LocationClient
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideAppDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            AppDatabase.DATABASE_NAME
        )
        .fallbackToDestructiveMigration()
        .build()
    }

    @Provides
    @Singleton
    fun provideCaptureDao(database: AppDatabase): CaptureDao {
        return database.captureDao()
    }

    @Provides
    @Singleton
    fun provideCaptureRepository(
        @ApplicationContext context: Context,
        captureDao: CaptureDao
    ): CaptureRepository {
        return CaptureRepositoryImpl(context, captureDao)
    }

    @Provides
    @Singleton
    fun provideLocationClient(@ApplicationContext context: Context): LocationClient {
        return LocationClient(context)
    }
}`
  },
  {
    id: 'main-activity',
    name: 'MainActivity.kt',
    path: 'app/src/main/java/com/geocam/offline/MainActivity.kt',
    category: 'ui',
    description: 'Actividad principal con gestión de permisos de Cámara y GPS y Navegación Jetpack Compose.',
    code: `package com.geocam.offline

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.core.content.ContextCompat
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.geocam.offline.ui.screens.DetailScreen
import com.geocam.offline.ui.screens.HistoryScreen
import com.geocam.offline.ui.screens.NewCaptureScreen
import com.geocam.offline.ui.viewmodel.CaptureViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val captureViewModel: CaptureViewModel by viewModels()

    private val requestPermissionsLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val cameraGranted = permissions[Manifest.permission.CAMERA] ?: false
        val locationGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] ?: false
        if (locationGranted) {
            captureViewModel.refreshLocation()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        checkAndRequestPermissions()

        setContent {
            MaterialTheme(colorScheme = darkColorScheme()) {
                val navController = rememberNavController()
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                Scaffold(
                    bottomBar = {
                        if (currentRoute != "detail/{recordId}") {
                            NavigationBar(containerColor = Color(0xFF0F172A)) {
                                NavigationBarItem(
                                    selected = currentRoute == "new_capture",
                                    onClick = { navController.navigate("new_capture") },
                                    icon = { Icon(Icons.Default.PhotoCamera, contentDescription = null) },
                                    label = { Text("Nueva Captura") }
                                )
                                NavigationBarItem(
                                    selected = currentRoute == "history",
                                    onClick = { navController.navigate("history") },
                                    icon = { Icon(Icons.Default.History, contentDescription = null) },
                                    label = { Text("Historial") }
                                )
                            }
                        }
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = "new_capture",
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("new_capture") {
                            NewCaptureScreen(
                                viewModel = captureViewModel,
                                onNavigateToHistory = { navController.navigate("history") }
                            )
                        }
                        composable("history") {
                            HistoryScreen(
                                viewModel = captureViewModel,
                                onRecordClick = { recordId ->
                                    navController.navigate("detail/$recordId")
                                }
                            )
                        }
                        composable("detail/{recordId}") { backStackEntry ->
                            val recordId = backStackEntry.arguments?.getString("recordId") ?: ""
                            DetailScreen(
                                recordId = recordId,
                                viewModel = captureViewModel,
                                onBack = { navController.popBackStack() }
                            )
                        }
                    }
                }
            }
        }
    }

    private fun checkAndRequestPermissions() {
        val permissionsToRequest = mutableListOf<String>()

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            permissionsToRequest.add(Manifest.permission.CAMERA)
        }
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            permissionsToRequest.add(Manifest.permission.ACCESS_FINE_LOCATION)
            permissionsToRequest.add(Manifest.permission.ACCESS_COARSE_LOCATION)
        }

        if (permissionsToRequest.isNotEmpty()) {
            requestPermissionsLauncher.launch(permissionsToRequest.toTypedArray())
        }
    }
}`
  },
  {
    id: 'android-manifest',
    name: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    category: 'gradle',
    description: 'Manifiesto de la aplicación con los permisos de GPS Hardware y Cámara declarados.',
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permisos para GPS sin datos móviles (Hardware GPS) -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <!-- Permisos para Cámara -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="true" />
    <uses-feature android:name="android.hardware.location.gps" android:required="true" />

    <application
        android:name=".GeoCamApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="GeoCam Offline"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.GeoCamOffline">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.GeoCamOffline">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>`
  }
];
